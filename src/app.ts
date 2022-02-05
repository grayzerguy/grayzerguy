import coffees from "./coffee";
import express, { Request, Response } from "express";





const server = express();
server.use(express.json());



server.get("/api/coffee", (req: Request,res:Response) => {
    res.json(coffees)

});

server.get("/api/coffee/sortbyprice", (req: Request,res:Response) => {
    //sort by price

    const sortedCoffees = coffees.sort((a,b) => a.price - b.price);
    res.json(sortedCoffees)


}
);

server.get("/api/coffee/sortbystrength", (req: Request,res:Response) => {
    //sort by strength
    const sortedCoffees = coffees.sort((a,b) => a.strength - b.strength);
    res.json(sortedCoffees)
});




server.get("/api/coffee/:id", (req: Request,res:Response) => {
    const id = +req.params.id;
   
    const coffee = coffees.find(c => c.id === id)
    if(!coffee) {
        res.status(404).send("The coffee with the given ID was not found")
    }
    res.json(coffee)
});

server.post("/api/coffee", (req: Request, res: Response) => {
    console.log(req.body)
    const coffee = req.body;
    // coffee.id = coffees[coffees.length - 1].id + 1;
    coffee.id = coffees.length + 1;
    coffees.push(coffee);
    res.status(201).json(coffee);
});


server.put("/api/coffee/:id", (req: Request,res:Response) => {
    const id = +req.params.id;
    const coffee = req.body;
    const index = coffees.findIndex(c => c.id === id);
    if(index === -1) {
        res.status(404).send("The coffee with the given ID was not found")
    }
    coffees[index] = coffee;
    res.json(coffee)
});

server.patch("/api/coffee/:id", (req: Request,res:Response) => {
    const id = +req.params.id;
    const coffee = req.body;
    const index = coffees.findIndex(c => c.id === id);
    if(index === -1) {
        res.status(404).send("The coffee with the given ID was not found")
    }
    coffees[index] = {...coffees[index], ...coffee};
    res.json(coffees[index])
});

server.delete("/api/coffee/:id", (req: Request,res:Response) => {
    const id = +req.params.id;
    const coffee = coffees.find(c => c.id === id);
    if(!coffee) {
        res.status(404).send("The coffee with the given ID was not found")
    }
    const index = coffees.findIndex(c => c.id === id);
    coffees.splice(index, 1);
    res.json(coffee)
});







server.listen(3001, () => {
    console.log("Server is running on port 3001");
});



