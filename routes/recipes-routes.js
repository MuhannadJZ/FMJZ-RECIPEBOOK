const Recipe = require('../models/Recipe')
const router= require("express").Router()

router.get("/", (req,res)=> {
    res.render("recipes.ejs")
})


// For posting we need 2 routes

router.get("/new",(req,res)=>{

    res.render("recipes-create.ejs")
})


router.post("/new",async (req,res)=>{
    try{
        if(req.body.image === '') {
            req.body.image = undefined
        }
    await Recipe.create(req.body)
    res.redirect("/recipes/community")

    }catch(error){
        console.log(error)
    }
})

router.get("/community",async (req,res)=>{
    try{
        const allRecipes = await Recipe.find()
        console.log("allrecipes" + allRecipes)
        res.render("allRecipes.ejs", {allRecipes: allRecipes})
        
    }
    catch(error){
        console.log(error)
    }
})

/* 
1. create a router.get()
2. this router.get() should get the recipe by the id
3. pass the recipe that is found to the ejs page and render it using res.render()
4. display the values in the ejs page
 /:id
*/


const express = require('express');
const Router = express.Router();

router.get("/:recipeId",async (req,res)=>{
    console.log(req.params)
    try{
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    console.log(foundRecipe)
    res.render("recipe-read.ejs",{foundRecipe})

    }
    catch(error){
        console.log(error)
    }
})


//

router.get("/:id/update", async (req,res) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id);
        res.render("Recipe-Update.ejs", { foundRecipe: foundRecipe });
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
});

router.put("/:id", async (req,res) => {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/recipes/community");
    } catch (error) {
        console.log(error);
        res.send("Error updating");
    }
});

router.get("/delete/:id", async (req,res)=>{
    try{
        const foundRecipe = await Recipe.findById(req.params.id)
    res.render('recipe-delete',{foundRecipe})
    }
    catch(error){
        console.log(error)
    }
})

//
router.delete("/:id", async (req,res)=>{
    console.log(req.params)
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id)
        res.redirect("/recipes")
    }
    catch(error){
        console.log(error)
    }
})
//
module.exports = router;














