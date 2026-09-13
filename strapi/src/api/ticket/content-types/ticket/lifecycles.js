"use strict";

const UID = "api::ticket.ticket";

function autoActivateIfDue(ticket) {
  if (
    !ticket ||
    ticket.Is_Ticket_Live !== false ||
    ticket.Has_Ticket_Auto_Activated ||
    !ticket.Start_Date_Ticket_Sales
  ) {
    return;
  }

  if (new Date(ticket.Start_Date_Ticket_Sales) > new Date()) {
    return;
  }

  ticket.Is_Ticket_Live = true;
  ticket.Has_Ticket_Auto_Activated = true;

  // Persisted outside the current find's transaction: awaiting an update here,
  // inside afterFind*, deadlocks Strapi's query engine (the update tries to
  // nest inside a transaction the find hook hasn't returned from yet).
  setImmediate(() => {
    strapi.entityService
      .update(UID, ticket.id, {
        data: { Is_Ticket_Live: true, Has_Ticket_Auto_Activated: true },
      })
      .catch((err) => strapi.log.error(`Failed to auto-activate ticket ${ticket.id}`, err));
  });
}

module.exports = {
  afterFindOne(event) {
    autoActivateIfDue(event.result);
  },
  afterFindMany(event) {
    if (Array.isArray(event.result)) {
      event.result.forEach(autoActivateIfDue);
    }
  },
};
