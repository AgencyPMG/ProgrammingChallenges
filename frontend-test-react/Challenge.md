# PMG Front End Code Challenge

We are needing to build a Todo list UI. Our designer has put together a basic UI and we need to make the functionality work.

You should code this how you would design the Component hierarchy. But here are some features we want.

1. Ability to type a Todo and hit `enter`, and immediately be able to type again to add another todo.
3. On hitting `enter` the Todo is added to the list below. (Or if `Add` button is clicked.)
4. Click `Done`/`Not Done` buttons to toggle the status of a Todo. This also toggles the Done button to Not Done and vice versa
5. When a Todo is marked `complete` the text should be styled as Strikethrough text.
6. Click `Remove` button should remove the Todo from the list.
7. Add a button on the right side of the `<h1>` that says "Complete All" which on click marks all todos in the list as complete.
8. When all todos are `Complete` the `Complete All` button should change to `Remove All` which when clicked, removes all Todos from the list.
    - The idea here is that as a user, you can only `Remove All` when all todos are "complete"
9. `Remove All` should be red border, with red text
10. `Complete All` should be Teal-300 border with Teal-300 text.


# Tech used

This is a React application, that uses [TailwindCSS](https://tailwindcss.com) for styling.
