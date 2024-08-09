import React from 'react';
import NavBar from '../../components/navbar/navbar';
import './FAQ.css';

const FAQ = () => {
  return (
    <>
      <NavBar />
      <div className="content">
        {/* FAQ Section*/}
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>What is 1Space?</h3>
            <p>At 1Space, we make sure to provide a thorough web application that aids students by emphasizing organization, drive, productivity and financial wellness. Our aim is to effectively include these fundamental aspects into a unified platform, catering to the diverse requirements of students. We hope to improve or support the student experience by combining these essential elements into an intuitive interface, encouraging a budget-conscious, socially aware and well-organized way of everyday living.</p>
          </div>
          <div className="faq-item">
            <h3>Can I make a custom category for my tasks?</h3>
            <p>Yes, it is possible to make individual categories for your tasks on 1Space. Choose the "Add Category" option after navigating to the Task Manager page. Enter the name of your new category, then save it. When this custom category is created, you can attach tasks to it in order to properly organize your to-do list based on your requirements.</p>
          </div>
          <div className="faq-item">
            <h3>How do I filter and sort deals and events to find what I need?</h3>
            <p>On the budget hub page, you can modify your viewings by utilizing the filters and sorting tools. Using filters, you may focus your search on specific categories, such as the type of event or deal (food, clothes, entertainment). You can organize the results using the sorting feature according to relevance, date, or popularity.</p>
          </div>
          <div className="faq-item">
            <h3>Can I edit or delete a transaction?</h3>
            <p>Yes, navigate to the Finance page, find the transaction you wish to edit or delete, and then make your changes. To view the transaction details, click on it. Options to edit or delete the transaction will be visible to you. Choose "Delete" to remove the transaction, or select "Edit" to modify the transaction.</p>
          </div>
          <div className="faq-item">
            <h3>How do I know if a deal is still valid?</h3>
            <p>Browse through the details of the deal on the Budget Hub to see if it is still available. The validity period or date of expiration is displayed on each deal card. You may also utilize the hyperlinks provided to the official deal site or social media accounts to verify the current status of the deal in real-time.</p>
          </div>
        </div>

        {/* Page Guides Section */}
        <div className="page-guides-container">
          <h2>Page Guides</h2>

          <div className="page-guide-item">
            <h3>Login Page Guide</h3>
            <p>1Space's Login page offers users an easy and safe way to access their accounts. Users are to fill in the fields of email address and password, and these credentials are eventually saved. Users can click on the "Forgot Password" button to gain reset instructions and help with password recovery. With an intuitive layout and necessary links for account administration, the page is made to be easily navigated.</p>
          </div>

          <div className="page-guide-item">
            <h3>Dashboard Page Guide</h3>
            <p>The Dashboard page provides an overview of your task productivity and a summary of your financial status. It has direct links to the Task Manager, Finance Board and Budget Hub pages. It also includes recents deals or events and daily motivational quotes.</p>
          </div>

          <div className="page-guide-item">
            <h3>Task Manager Page Guide</h3>
            <p>On the Task Manager page, you may create, categorize, prioritize, edit and delete your tasks . For every task, you can set reminders and due dates through notifications. To organize your tasks according to categories, priority, or type of task, you can use labels. You can monitor your progress by ticking off the tasks you've finished. You can also earn various badges based on the missions you have completed.</p>
          </div>

          <div className="page-guide-item">
            <h3>Finance Board Page Guide</h3>
            <p>On our Finance Board page, you can track your income and expenses, as well as get a financial summary that shows you exactly how much you have already spent and how much is left. Utilize the categorization function to assign labels and arrange your spendings. Pie charts can also be used to visualize your expenses, broken down into categories.</p>
          </div>

          <div className="page-guide-item">
            <h3>Budget Hub Page Guide</h3>
            <p>Here, the most recent local events as well as the greatest offers and savings on dining, apparel, entertainment, and other items can be found on the Budget Hub page. Your interests are taken into consideration when suggesting events, so you are never missing out on fascinating local events. Every deal is shown on a card with complete information and direct links to social media profiles are provided for further information. To offer the newest and the best deals, this page is updated on a regular basis.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;