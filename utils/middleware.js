const ExpressError = require("./ExpressError");
const Campground = require('../models/campground')
const Review = require('../models/review');
const { reviewSchema,campgroundSchema } = require("./schemas");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in first');
        return res.redirect('/login')
    }else{
        next();
    }
}

module.exports.validateCampground = (req,res,next) => {
    const { error } = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next) => {
    const { error } = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

module.exports.isAuthor = async (req,res,next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have permission to edit the campground :(');
        return res.redirect(`/campgrounds/${id}`)
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission to delete the review')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}