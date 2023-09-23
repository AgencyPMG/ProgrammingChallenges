-- 1. Write a query to get the sum of impressions by day.
SELECT date, SUM(impressions) AS total_impressions
FROM marketing_performance
GROUP BY date
ORDER BY date;

--2. Write a query to get the top three revenue-generating states in order of best to worst. How much revenue did the third best state generate?
SELECT state, SUM(revenue) AS total_revenue
FROM website_revenue
GROUP BY state
ORDER BY total_revenue DESC;

--Third best state was Ohio at 37,577 total impressions


--3. Write a query that shows total cost, impressions, clicks, and revenue of each campaign. Make sure to include the campaign name in the output.
SELECT
    c.Campaign_name,
    SUM(mp.cost) AS total_cost,
    SUM(mp.clicks) AS total_clicks,
    SUM(mp.conversions) AS total_conversions,
    SUM(mp.impressions) AS total_impressions
FROM Campaign_info c
INNER JOIN Marketing_performance mp ON c.ID = mp.campaign_id
GROUP BY c.name;


--4. Write a query to get the number of conversions of Campaign5 by state. Which state generated the most conversions for this campaign?
SELECT mp.geo, Sum(mp.conversions) AS total_conversions
FROM marketing_performance AS mp INNER JOIN Campaign_info AS ci ON mp.campaign_id = ci.ID
WHERE ((([ci].[Campaign_name])='Campaign5'))
GROUP BY mp.geo
ORDER BY Count(total_conversions) DESC , [ci].[Campaign_name];

-- Ohio generated the most conversions for campaign5 at 442


--5. In your opinion, which campaign was the most efficient, and why?

--campaign5 was the most efficient because it had the lowest cost per conversion at $1.91 among all campaigns. 

--6. Write a query that showcases the best day of the week (e.g., Sunday, Monday, Tuesday, etc.) to run ads.
SELECT WeekdayName(date) AS day_of_week, AVG(conversions) AS average_conv
FROM Marketing_performance
GROUP BY day_of_week
ORDER BY average_conv DESC;