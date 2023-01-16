import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
const [meal,setMeal] = useState([])
const [isLoading,setisLoading] = useState(true)
const [hasError,sethasError] = useState()

 useEffect(() => {
  const fetchData = async () => {
   try{const response =  await fetch("https://foodfest-64439-default-rtdb.firebaseio.com/meals.json")
    const data = await response.json();
    
    let loadedMeal= []
    for(const key in data){
      
      loadedMeal.push(
        {
          id : key,
          name : data[key].name,
          description : data[key].description,
          price : data[key].price
        }); 
        setMeal(loadedMeal)
        setisLoading(false)
    }}catch (error){
        sethasError(true)
        setisLoading(false)
        console.log(error.message)
    } 
  }
  
  fetchData()
 },[]) 
  
  const mealsList = meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && !hasError && <p>Loading</p>}
        {hasError && <p>Somehing went wrong</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
