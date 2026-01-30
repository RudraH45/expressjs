console.log("hello");
import express, { Router } from 'express';

const app = express();
const PORT = 3000;
const router = express.Router();

app.use(express.json());

const cars = [
    {id: 1, make: 'Toyota', model: 'Corolla'},
    {id: 2, make: 'Honda', model: 'Civic'},
    {id: 3, make: 'Ford', model: 'Focus'}
]
app.get("/", (req, res) => {
    res.send("Hello World from Express.js");
})

router.post("/cars" , (req, res) => {
    const { make, model} = req.body;

    if(!make || !model){
        return res.status(404).send({error:"Missing Feilds"});
    }

    const newCar = {
        id: cars.length + 1 ,
        make,
        model 
    }
    cars.push(newCar);
    res.status(201).json((newCar));
})

router.put("/cars/:id", (req, res) => {
    console.log("hello from put");
  const { id } = req.params;

  const index = cars.findIndex(c => c.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const { make, model } = req.body;

  if (make) cars[index].make = make;
  if (model) cars[index].model = model;

  res.json(cars[index]);
});

router.delete("/cars/:id", (req, res) => {
    const {id} = req.params
    const index = cars.findIndex((c) => c.id === Number(id));

    if(index === -1){
        return res.status(404).send({error: "Id not found"});
    }

    const deleted = cars.splice(index, 1)[0];
    res.json({message: "Car deleted", car: deleted});
})


router.get("/cars/:id", (req, res) => {
    const {id} = req.params;
    const car = cars.find((cars) => cars.id === Number(id));

    console.log("requested id:" , id);

    if(!car){
        return res.status(404).send("Not Found");
    } 
    res.send(car);
})

router.get("/cars", (req, res) => {
    res.send(cars);
});

app.use('/home', router);

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});