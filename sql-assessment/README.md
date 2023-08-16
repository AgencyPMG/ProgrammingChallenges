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
*  Question #2
 Generate a query to gather the sum of revenue by store_location from the store_revenue table
​
*  Question #3
 Merge these datasets so we can see impressions, clicks, cost, conversions, and revenue all together with the campaign name.
​
* Question #4
 In your opinion, what is the most efficient state and why?

Challenge Questions
* Question #5
  Generate a query that showcases the best da​y of the week (e.g Monday, Tuesday, Friday, etc.) to run ads?
  
* Question #6
 Assuming the campaign name has the following naming convention `BusinessUnit_Tactic_category_stategy`
 Generate a query to rank in order the top 3 Business Units by revenue?

​
