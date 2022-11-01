# SQL Challenge

The database contains two tables, store_revenue and marketing_data.  Refer to the two CSV
files, store_revenue and marketing_data to understand how these tables have been created.

store_revenue contains revenue by date, brand ID, and location:

 >  create table store_revenue (
 >     id int not null primary key auto_increment,
 >    date datetime,
 >    brand_id int,
 >    store_location varchar(250),
 >    revenue float  
 >  );

marketing_data contains ad impression and click data by date and location:

> create table marketing_data (
>  id int not null primary key auto_increment,
>  date datetime,
>  geo varchar(2),
>  impressions float,
>  clicks float
> );

### Please provide a SQL statement under each question.

* Question #0 (Already done for you as an example)
 Select the first 2 rows from the marketing data
​
>  select *
>  from marketing_data
> limit 2;
​
*  Question #1
 Generate a query to get the sum of the clicks of the marketing data
​ 
select sum(clicks) as total_clicks
from marketing_data;

*  Question #2
 Generate a query to gather the sum of revenue by store_location from the store_revenue table
​
select store_location, sum(revenue) as total_revenue
from store_revenue
group by store_location;

*  Question #3
 Merge these two datasets so we can see impressions, clicks, and revenue together by date
and geo.
 Please ensure all records from each table are accounted for.
​
select a.id, a.date, a.brand_id, a.revenue, b.geo, b.impressions, b.clicks
from store_revenue as a 
left join marketing_data as b
on a.date = b.date and right(a.store_location, 2) = b.geo
union
select a.id, a.date, a.brand_id, a.revenue, b.geo, b.impressions, b.clicks
from store_revenue as a 
right join marketing_data as b
on a.date = b.date and right(a.store_location, 2) = b.geo;

* Question #4
 In your opinion, what is the most efficient store and why?
​
-- In my opinion, the most efficient store is the store in California with brand id 2
-- as it has the highest total revenue, total impressions, total clicks, revenue per impression, and revenue per click.

select a.brand_id, b.geo, sum(a.revenue) as total_revenue, 
sum(b.impressions) as total_impressions,
sum(b.clicks) as total_clicks, 
round(sum(a.revenue)/sum(b.impressions), 2) as revenue_per_impression,
round(sum(a.revenue)/sum(b.clicks), 2) as revenue_per_click
from store_revenue as a 
inner join marketing_data as b
on a.date = b.date and right(a.store_location, 2) = b.geo
group by a.brand_id, b.geo;

* Question #5 (Challenge)
 Generate a query to rank in order the top 10 revenue producing states
​
select store_location, sum(revenue) as total_revenue
from store_revenue
group by store_location
order by total_revenue desc
limit 10;
