module.exports = {
  config: {
    "api::user-ticket.user-ticket": {
      columns: ["Name", "Email", "Paid", "Phone_Number", "Attendance"],
      relation: {
        Answers: {
          column: ["Answer"],
        },
        Ticket_ID: {
          column: ["Stripe_Link"],
        },
      },
      locale: "false",
    },
    "api::people.people": {
      columns: [
        "Name",
        "Email",
        "University_ID",
        "UPI",
        "Year_Of_Study",
        "Study_Field",
        "Status",
        "Member_Expiry_Date",
        "Institution",
      ],
      relation: {},
      locale: "false",
    },
  },
};
