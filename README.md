# klein UI
klein UI is designed to allow for flexible creation of web UIs in typescript.
The main aims of klein UI are to:
- contribute minimally to bundle size
- provide an intuitive builder pattern api for building dom nodes
- allow for full control over when changes are rendered
- reduce complexity and mental overhead vs larger ts frameworks

## Install
`npm i kleinui`

## Basic app setup

main.ts
```
import { container, header1 } from "kleinui/elements"
import { renderApp } from "kleinui"

const app = new container(
    new header1("Welcome to your first klein UI application!")
)

renderApp(app, document.getElementById("app")!)
```

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>klein UI app</title>
</head>
<body style="margin: 0;">
    <div id="app" style="height: 100vh;"></div>
    <script src="out.js"></script>
</body>
</html>
```

Use your favourite build tool to bundle the typescript:
`esbuild main.ts --outfile="out.js" --bundle --watch`

Then, simply run a basic web server such as vscode live server extension.

The basic premise of kleinui is that children of nodes are simply passed as arguments to the class constructor and then other attributes can be modified with the methods of the node.
These methods can be chained together to make a readable and easy to follow tree of nodes. Strings are automatically converted to `kleinTextNode`.

For example, to add styles and an event listener:
```
const app = new container(
    new header1("Welcome to your first klein UI application!")
        .addStyle("color: red;")
        .addEventListener("click", ()=>{
              alert("clicked")
        })
)
```

If you wanted to change the contents of the h1 when it was clicked, the first argument given to the callback function of the event listener is the node itself.
This means you don't have to store the node in a variable beforehand to reference it.
In this example, the h1 will become a counter incrementing by 1 on every click.

```
var count = 0
const app = new container(
    new header1(count.toString())
        .addStyle("color: red;")
        .addEventListener("click", (self)=>{
              count++;
              (self.children[0] as kleinTextNode).content = count.toString()
              self.children[0].rerender()
        })
)
```

Although this looks quite cumbersome compared with counter examples with other TS frameworks, it allows for an unmatched level of flexibility.
As you can see, you must explicitly call `rerender()` on nodes for their changes to appear in the DOM. 
I reccomend to only use `rerender()` on specifically text nodes like in this example and prefer `lightRerender()` for normal nodes.
This just means that only changes are reflected as opposed to a complete restrucutring of the element which is not as performant.


## Components
Components are completely left up to you but I would reccomend that you just use a function that returns a kleinNode. For example, here I have a component that takes in a name and an age and returns a simple card:
```
function Card(name: string, age: number) {
    return new container(
        new header1(name).addStyle("color: red; width: min-content;"),
        new paragraph(`This is ${name} and he/she is ${age} years old.`)
    ).addStyle("border: 1px solid black; border-radius: 2em; padding: 1em; width: 8em;")
}
```
I'll admit, I'm not an artist, but it's just an example!

