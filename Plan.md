# Taboola Home Assignment


## Yaniv Gabay 


### Check list

- [x] Create the project
- [x] Create the api call
- [x] Create the recommendation widget
- [x] Create the sponsored recommendations widget
- [x] Create a factory for future widgets
- [x] Create tests for api and widgets
- [x] Made sure its responsive
- [X] Each element has fixed size on the UI
- [X] Added Hover effect
- [ ] Finish the readme file

## Future improvements/Regrets

- i DONT like npm, should have used Yarn, just overall dont like it.
- Should have learn about pollyfills, to support older browsers like IE11.
- Use some kind of logger instead of console.log
- Maybe a loading state for each sponsored recommendation, instead of the whole recommendation list.
- Think of more sophisticated tests.
- Maybe to seperate the tests into a different npm project, but not sure about it.
- Live server is not really live, cus we need to retransform the typescript code to javascript, when we change the javascript.
so basicly its not needed, Vite is better for this.



## Plan

In order to create a modular component, we need to look at those key points given from the assigment:

- should be design based on the Taboola REST API
- Fully functional and should open the selected recommendation
- We should only use client side code.
- The widget should be rendered in the client side using HTML,JS (TS) and CSS.
- *Important* we want to try to support as many browsers as possible, we were given a hint that not all browsers api are supported in all browsers.

#### Design key points

- Running the code (without test) , should be only vanilla typescript code, no frameworks or libraries.
- Design must be responsive and work on all devices (mobile and desktop).
- We should supply instruction to run the code.
- We must be coverted by Unit tests, We can use Jest or any other library.
- We should think about the usability and design of the widget, that would produce the optimal performance.
- We render on other people sites, so we must be sensible.
- Also we need to design the code, in a way that will allow adding more types of recommendations, for example, videos, gifs, etc.


### Actual plan

- Use typescript for the project.
- Start with the Taboola API code, and create tests for it.
- took the logger class from my other project.
- created a basic recommendation widget which is a container that fetches recommendations and displays them.
- that widget will decide if to display error/loading states.
- Than we will create the sponsored recommendations widget, which will recive a data for a single sponsored recommendation.
- that component, will handle the ui etc.
- we will create a factory for future widgets, that will be used to create new widgets.
