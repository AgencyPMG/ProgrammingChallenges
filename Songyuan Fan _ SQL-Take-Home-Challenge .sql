SELECT * FROM store_revenue LIMIT 10;
SELECT * FROM marketing_data LIMIT 10;
#Explanation: Use select “*” to learn overall tables and to check what marketing & store_revenue table looks like. Also we use limit 10  to save time to check out the table structure in case we have billions of rows.  

#Question #1 Generate a query to get the sum of the clicks of the marketing data​
SELECT SUM(clicks) AS Total_clicks 
FROM marketing_data;
#Explanation:  Use "SUM" function to find total number of clicks across the whole marketing_date sets. 

#Question # 2 Generate a query to gather the sum of revenue by geo from the store_revenue table​
SELECT store_location, SUM(revenue) AS geo_revenue
FROM store_revenue 
GROUP BY 1;
#Explanation: Use "SUM" function to find total number of revenue; Also because the question is asking for "sum of revenue by geo", then we need to use "GROUP BY" to sum revenue based on different geos. 


#Question No3. Merge the two datasets to see impressions, clicks, and revenue together by date and geo. Please ensure all records from each table are accounted for.​
SELECT M.date, M.geo, SUM(M.impressions) AS geo_date_impressions, SUM(M.clicks) AS geo_date_clicks, SUM(S.revenue) AS geo_date_revenue
FROM marketing_data  M 
LEFT JOIN Store_revenue S ON RIGHT(S.store_location,2)=M.geo AND M.date= S.date
GROUP BY 1 , 2 
UNION 
SELECT S.date,RIGHT(S.store_location,2) AS geo, SUM(M.impressions) AS geo_date_impressions,SUM( M.clicks) AS geo_date_clicks, SUM(S.revenue) AS geo_date_revenue
FROM marketing_data  M 
RIGHT JOIN Store_revenue S ON RIGHT(S.store_location,2)=M.geo AND M.date= S.date
GROUP BY 1,2;
#Explanation: Because I am using MySQL to execute merge, then we can only use "UNION" function to execute merge function. However, "UNION" may requires longer time to process. Also since "UNION ALL" cause duplicates when merge two tables so that we cannot use it. 
#In other SQL server, "FULL OUTER JOIN" can be used to merge two tables. Also, because "store_location" in store_revenue has the only last two characters the same as "geo" in marketing_data. We use "RIGHT(store_location,2)" function to exact 2 characters from right. For "LEFT JOIN", it returns all 
#records from "marketing_data" and we use "GROUP BY' through "marketing.date"  and "marketing.geo" to achieve many to manay join and avoid duplicates. For "RIGHT JOIN", it returns all records from "Store_revenue" and we use "Group BY" through "store_revenue.date" 
# and "store_revenue.store_location" to ahieve many to many join and avoid duplicates. 


#Question the most efficient store and why 
#Click Through Rate-CTR 
SELECT geo, (SUM(clicks)*100/SUM(impressions)) AS CTR
FROM marketing_data
GROUP BY geo
ORDER BY CTR DESC ;
#From marketing pespective, we first calculate Click-Through_Rate, CTR, which is a metric used to measure marketing campaign efficiency. CTR is calculated as "Number of click-throughs" divided by "Number of impressions" *100%. So that we write query as above to find first metric. 
#In order to calculate total number of clicks and total number of impressions, we used "GROUP BY" geo  and "SUM" function to calculate total clicks and total impressions. Then we order CTR on descending order to find top 3 states which have highest CTR. After we run the query 
# in MySQL, it showed that "MN","TX" and "CA" are top 3 stores which have highest CTR. MN has highest CTR which is 4.5. Also CTR for "TX" and "CA" have 1.395 and 1.374 respectively and there was no a big difference. However, this metric is limited to marketing perspectives. For different stores, we should 
#focus on revenues for different stores. Therefore, we also consider second metric "Coversion Rate" CVR to measure effectiveness of each store in different states. 

#Conversion Rate-CVR 
WITH merged AS (SELECT  M.geo, SUM(M.impressions) AS geo_date_impressions, SUM(M.clicks) AS geo_date_clicks, SUM(S.revenue) AS geo_date_revenue
FROM marketing_data  M 
LEFT JOIN Store_revenue S ON RIGHT(S.store_location,2)=M.geo  
GROUP BY 1
UNION 
SELECT RIGHT(S.store_location,2) AS geo, SUM(M.impressions) AS geo_date_impressions,SUM( M.clicks) AS geo_date_clicks, SUM(S.revenue) AS geo_date_revenue
FROM marketing_data  M 
RIGHT JOIN Store_revenue S ON RIGHT(S.store_location,2)=M.geo 
GROUP BY 1) 

SELECT geo, SUM(geo_date_revenue)/SUM(geo_date_clicks) AS CVR 
FROM merged 
GROUP BY 1
ORDER BY CVR DESC;
#Explanation: In order to calculate Conversion Rate-CVR, we need to use merged table of marketing_data and store_revenue. We can use "WITH" clause with the CTEs as a reference which can be used 
#by us to refer back. So the clause goes into WITH clause is merged query which is the same as questions No.3 except for marketing date and revenue_store date, which are not used for CVR calculation. 
#In order to calculater CVR, we need to use "SUM" and "GROUP BY" through geo to find out total revenues and total clicks. Then we can order CVR in descending order to find top stores with highest CVR. 
#After we run the CVR query in MySQL, because "MN" does not have "revenue" so the top store was in "CA", which has CVR of 379.4145. Considering about store effectiveness, we should belived store in 
#"CA" is the most effective store. 



#Question 5 (Challenge) Generate a query to rank in order the top 10 revenue producing states​
SELECT x.store_location
FROM (SELECT store_location,SUM(revenue) AS revenue
FROM store_revenue 
GROUP BY 1) AS x
ORDER BY x.revenue DESC 
LIMIT 10;
#Explanation: In order to find total revenues for different states, we should use "SUM" and "GROUP BY" functions to calculate total revenues for different state. Also to find out top 10 revenue states, 
#we should use "LIMIT 10" function and order revenue in descending order. For each subquery, we should refer to alias x to find out specific store_location, that is, the name of states. 













