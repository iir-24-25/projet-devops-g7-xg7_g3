"use client";

import React, { useState, useCallback, ChangeEvent } from "react";
import {
  Eventcalendar,
  Popup,
  Input,
  Datepicker,
  setOptions,
  MbscCalendarEvent,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscPopupOptions,
  MbscResponsiveOptions,
  MbscDateType,
  MbscDatepickerChangeEvent,
  MbscResource,
  localeFr,
  MbscPopupButton,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css"; // Import Mobiscroll styles
import "./Calendar.css"; // Import the custom CSS

// Mobiscroll configuration
setOptions({
  locale: localeFr,
  theme: "ios",
  themeVariant: "light",
});

// Default events
const defaultEvents: MbscCalendarEvent[] = [
  {
    start: "2025-03-13T06:00",
    end: "2025-03-13T14:00",
    title: "Farmhouse TPH",
    location: "3339 Spruce Drive",
    resource: ["d2", "cm2", "d4", "cp1", "cm2", "ce2", "b1"],
    color: "#12ca6c",
    cost: 48000,
  },
  {
    start: "2025-03-14T08:00",
    end: "2025-03-14T18:00",
    title: "Block of flats KXT",
    location: "4698 Mercer Street",
    resource: ["d1", "cm1", "d3", "cp1", "cm3", "ce2", "b2"],
    color: "#c170c3",
    cost: 36000,
  },
];

// Resources for the calendar
// Resources for the calendar
const myResources: MbscResource[] = [
    {
      id: "professors",
      name: "Professors",
      children: [
        {
          id: "p1",
          name: "Dr. John Smith",
        },
        {
          id: "p2",
          name: "Prof. Jane Doe",
        },
        {
          id: "p3",
          name: "Dr. Alice Johnson",
        },
        {
          id: "p4",
          name: "Prof. Bob Brown",
        },
        {
          id: "p5",
          name: "Dr. Charlie Davis",
        },
        {
            id: "p5",
            name: "Dr. Charlie Davis",
          },{
            id: "p5",
            name: "Dr. Charlie Davis",
          },
      ],
    },
  ];

const viewSettings = {
  timeline: {
    type: "week" as "week",
    startDay: 1,
    endDay: 5,
  },
};

const responsivePopup: MbscResponsiveOptions<MbscPopupOptions> = {
  medium: {
    display: "anchored",
    width: 520,
    fullScreen: false,
    touchUi: false,
  },
};

const Calendar = () => {
  const [myEvents, setMyEvents] = useState<MbscCalendarEvent[]>(defaultEvents);
  const [tempEvent, setTempEvent] = useState<MbscCalendarEvent>();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [popupEventTitle, setTitle] = useState<string | undefined>("");
  const [popupEventDate, setDate] = useState<MbscDateType[]>([]);

  const handleEventClick = useCallback((args: MbscEventClickEvent) => {
    setEdit(true);
    setTempEvent({ ...args.event });
    setTitle(args.event.title);
    setDate([args.event.start!, args.event.end!]);
    setPopupOpen(true);
  }, []);

  const handleEventCreated = useCallback((args: MbscEventCreatedEvent) => {
    setEdit(false);
    setTempEvent(args.event);
    setTitle(args.event.title);
    setDate([args.event.start!, args.event.end!]);
    setPopupOpen(true);
  }, []);

  const saveEvent = useCallback(() => {
    const newEvent = {
      ...tempEvent,
      title: popupEventTitle,
      start: popupEventDate[0],
      end: popupEventDate[1],
    };
    if (isEdit) {
      setMyEvents((prev) =>
        prev.map((event) => (event.id === tempEvent?.id ? newEvent : event))
      );
    } else {
      setMyEvents((prev) => [...prev, newEvent]);
    }
    setPopupOpen(false);
  }, [isEdit, popupEventTitle, popupEventDate, tempEvent]);

  const deleteEvent = useCallback(
    (event: MbscCalendarEvent) => {
      setMyEvents((prev) => prev.filter((e) => e.id !== event.id));
      setPopupOpen(false);
    },
    []
  );

  const handlePopupClose = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const popupButtons: (string | MbscPopupButton)[] = [
    "cancel",
    {
      text: isEdit ? "Save" : "Add",
      handler: saveEvent,
    },
  ];
  
  if (isEdit) {
    popupButtons.push({
      text: "Delete",
      handler: () => deleteEvent(tempEvent!),
      color: "danger",
    });
  }
  

  return (
    <div className="calendar-container">
      <Eventcalendar
        view={viewSettings}
        data={myEvents}
        resources={myResources}
        clickToCreate="double"
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        onEventClick={handleEventClick}
        onEventCreated={handleEventCreated}
      />
      <Popup
        isOpen={isPopupOpen}
        buttons={popupButtons}
        responsive={responsivePopup}
        onClose={handlePopupClose}
      >

        <div>
          <Input
            label="Title"
            value={popupEventTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Datepicker
            select="range"
            controls={["time"]}
            value={popupEventDate}
            onChange={(args: MbscDatepickerChangeEvent) =>
              setDate(args.value as MbscDateType[])
            }
          />
        </div>
      </Popup>
    </div>
  );
};

export default Calendar;