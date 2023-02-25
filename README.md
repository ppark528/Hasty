# Google Analytics Dashboard

A look into what I have collaborated for Hasty, a startup company which makes military movements as meaningful as possible. <br>
This project is a dashboard for visualizing the analytics data from the Google Analytics API. <br>

Hasty is an MVP and due to the proprietary nature of the code I can only provide code snippets.

---

## Built with

* .NET framework: Used to handle API authentication and to retrieve data from the Google Analytics Reports.
* React: Used to build the front-end of the dashboard. Allowing the admin to see the displayed data in an interactive manner. 
* Google Analytics Reporting API: Used to retrieve site traffic data and provided access to different metrics and dimensions such as sessions, pageviews, and more.

## Usage

After creating a project/account in the Google Cloud Console you can obtain API credentials which retrieves data, then the .NET framework handles and passes it to React for front-end display. <br>
React provides a variety of displays, which was used with apex charts, to display charts, tables, and graphs. The admin can interact with the charts to survey their data as needed.

![ga-dashboard](https://user-images.githubusercontent.com/112028762/220734802-c2549e8f-f0ef-4b93-951b-78aa9780010e.jpg)
