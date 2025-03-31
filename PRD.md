This is the PRD file for WeHouse project. WeHouse is a guest house in Anzali, Iran which I am building an app for to facilitate their reservation system.

- There must be a list of rooms. Each room
is known by its color. Each room has a
name (Yellow, Orange, Green, Red, Blue,
Purple), a capacity, type (shared or private),
number of two-person beds, number of
one-person beds, rent price (if shared price
for one person)

- Each room must have a current status
which represents the current state of the
room. There are 3 statuses: Full, Partially
Full (if it&#39;s shared), Ready for Reservation

- The list of rooms:
Yellow: One Two-person bed, one one-
person bed, rent: 2100 toman, Capacity: 3

Blue: Capacity: 2, Two one-person beds,

rent: 1400 toman

Purple: Capacity: 2, Two one-person beds,
rent: 1200 toman

Green: Capacity: 2, One two-person bed,
rent: 1800 toman

Red: Capacity: 2, One two-person bed,
rent: 1600 toman

Orange: Capacity: 4, shared, Rent: 400
toman (when a person reserves this room,
they basically reserve a &quot;bed&quot;) (For this
room the persons should declare how many
people they are so that it multiples by 400)

- The user (which is Wehouse owner)
should be able to change the status of the

room (for example when a resident leaves
earlier, the user should change the status of
the room to Ready For Reservation)

- The user should be able to remove or add
a new room. (For example, when they
expand)

- The user must be able to change the rent
price of each room.

- There must be a list of reservations. Each
reservation is submitted. Each reservation
should have: the name of the person who
reserved it, the room name (color), price
they paid (which automatically should be
the room price, but I&#39;m adding this because
a room price might change in time and it&#39;s
important to have the data), the starting
date of stay, the end date of stay, the date
that the room

got reserved (the date the admin submits
the reservation)

- Each room should have a calendar. The
calendar shows the dates that the room got
reserved and the dates the room was and is
empty. So for example when the admin
(user) wants to submit a new reservation for
a date, they can see all available dates to
select for reservations.

- Admin should be able to see the list of
reservations, which are sorted by the latest.
They should also be able to search through
reservations using customer&#39;s name, filter
them using room color, filter by date (for
example to see all reservations from 1 to 30
March). Obviously the list is too long so it
must be paginated.

- All dates must be in jalali. It would be

nice to also be able to access the latin
format of the dates, but Jalali is in high-
priority.

- There must be a list of &quot;Red-flag&quot;
customers. This list is updated when a
someone comes to the guest house and
does something unacceptable and the
owner decides they don&#39;t want to accept
them anymore. So the admin must be able
to enter new names, and the reason they
are &quot;red-flagged&quot; and should be able to see
it later.