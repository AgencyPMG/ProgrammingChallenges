-- Q1
SELECT
    date,
    SUM(impressions) AS total_impressions
FROM
    `pmg-sql-assessment.datasets.marketing_performance`
GROUP BY
    date
ORDER BY
    date;

-- Q2
WITH StateRevenue AS (
    SELECT
        state,
        SUM(revenue) AS total_revenue
    FROM
        `pmg-sql-assessment.datasets.website_revenue`
    GROUP BY
        state
)

SELECT
    state,
    total_revenue
FROM
    StateRevenue
ORDER BY
    total_revenue DESC
LIMIT 3
OFFSET 2;

-- Q3
WITH CampaignSummary AS (
    SELECT
        ci.name AS campaign_name,
        mp.campaign_id,
        ROUND(SUM(mp.cost), 2) AS total_cost,
        SUM(mp.impressions) AS total_impressions,
        SUM(mp.clicks) AS total_clicks,
        SUM(wr.revenue) AS total_revenue
    FROM
        `pmg-sql-assessment.datasets.campaign_info` AS ci
    LEFT JOIN
        `pmg-sql-assessment.datasets.marketing_performance` AS mp
    ON
        ci.id = mp.campaign_id
    LEFT JOIN
        `pmg-sql-assessment.datasets.website_revenue` AS wr
    ON
        ci.id = wr.campaign_id
    GROUP BY
        campaign_name, campaign_id
)

SELECT
    campaign_name,
    total_cost,
    total_impressions,
    total_clicks,
    total_revenue
FROM
    CampaignSummary;


-- Q4
SELECT
    mp.geo AS state,
    SUM(mp.conversions) AS total_conversions
FROM
    `pmg-sql-assessment.datasets.marketing_performance` AS mp
JOIN
    `pmg-sql-assessment.datasets.campaign_info` AS ci
ON
    mp.campaign_id = ci.id
WHERE
    ci.name = 'Campaign5'
GROUP BY
    state
ORDER BY
    total_conversions DESC;


-- Q5
-- The campaign that was the most efficient would be Campaign 3 because although it is the most costly, it generates the most number of total clicks and total impression resulting in the most revenue compared to the other 4 campaigns.

-- Bonus
WITH DayOfWeekMetrics AS (
    SELECT
        EXTRACT(DAYOFWEEK FROM date) AS day_of_week,
        SUM(clicks) AS total_clicks,
        SUM(impressions) AS total_impressions
    FROM
        `pmg-sql-assessment.datasets.marketing_performance`
    GROUP BY
        day_of_week
)

SELECT
    CASE
        WHEN day_of_week = 1 THEN 'Sunday'
        WHEN day_of_week = 2 THEN 'Monday'
        WHEN day_of_week = 3 THEN 'Tuesday'
        WHEN day_of_week = 4 THEN 'Wednesday'
        WHEN day_of_week = 5 THEN 'Thursday'
        WHEN day_of_week = 6 THEN 'Friday'
        WHEN day_of_week = 7 THEN 'Saturday'
        ELSE 'Unknown'
    END AS day_of_week,
    ROUND(AVG(total_clicks / total_impressions), 3) AS avg_ctr
FROM
    DayOfWeekMetrics
GROUP BY
    day_of_week
ORDER BY
    avg_ctr DESC;
