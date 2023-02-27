# Hasty

A look into what I have collaborated for Hasty, a web based startup company which makes military movements as meaningful as possible. <br>
Hasty is an MVP and due to the proprietary nature of the code I can only provide code snippets. <br>

---

I developed an admins analytic dashboard that provides a visual representation of data collected from Google Analytics API. Users can view the data in the form of graphs, charts, and tables, making it easier to understand and analyze the website's performance.

I also created an email service that allows administrators to send personalized emails to their customers using the Sendinblue third-party API. The service allows users to create email templates, customize them with personalization tags, and send them to their customers. <br>

---
## Built with

* .NET framework: Used to handle API authentication for both APIs and to retrieve data from the Google Analytics Reports.
* React: Used to build the front-end of the dashboard. Allowing the admin to see the displayed data in an interactive manner. 
* Google Analytics Reporting API: Used to retrieve site traffic data and provided access to different metrics and dimensions such as sessions, pageviews, and more.

## Usage

After creating a project/account in the Google Cloud Console you can obtain API credentials which retrieves data, then the .NET framework handles and passes it to React for front-end display. <br>

React provides a variety of displays, which was used with apex charts, to display charts, tables, and graphs. The admin can interact with the charts to survey their data as needed. <br>

Email services created for the adminstrator to send emails ranging from confirmation emails to resetting passwords <br>

![ga-dashboard](https://user-images.githubusercontent.com/112028762/221646185-44113cf7-71ac-4eb7-a965-027a7f1427bb.jpg)

![ga-dashboard2](https://user-images.githubusercontent.com/112028762/221646484-2450d5b8-cef2-4213-9715-e26f9bfcc97f.jpg)



