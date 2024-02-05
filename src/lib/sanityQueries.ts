import { groq } from "next-sanity";
// GROQ is Sanity's open-source query language. It's a powerful and intuitive language that's easy to learn. With GROQ you can describe exactly what information your application needs, join information from several sets of documents, and stitch together a very specific response with only the exact fields you need.

// A query typically starts with *. This asterisk represents every document in your dataset. To do any useful work this is typically followed by a filter in brackets. The filter above has two terms:

// Projections
// So if we run this query, the result will be an array containing all movies from the year 1979 onwards in the dataset. Nice! However in a typical application movies might be huge documents containing information on actors, staff, posters, tag-lines, show-times, ratings, and whatnot. If our goal is to render a list of movies in an overview, we are wasting bandwidth. Projections to the rescue.

// The typical projection is wrapped in braces and describes the data we want to see for each movie. A nice and simple projection for this query would give us the id, title, and release year for each movie. It could look like this: {_id, title, releaseYear}. Putting it all together:

export const getFeaturedRoomQuery = groq`*[_type=="hotelRoom" && isFeatured == true][0]{
	_id,
	description,
	discount,
	images,
	isFeatured,
	name,
	price,
	slug,
	coverImage
}`;

export const getRoomsQuery = groq`*[_type=='hotelRoom']{
	_id,
	coverImage,
	description,
	dimension,
	isBooked,
	isFeatured,
	name,
	price,
	slug,
	type
}`;

export const getRoom = groq`*[_type=='hotelRoom' && slug.current == $slug][0]{
_id,
coverImage,
name,
description,
dimension,
discount,
images,
isBooked,
isFeatured,
numberOfBeds,
offeredAmenities,
price,
slug,
specialNote,
type
}`;

export const getUserBookingsQuery = groq`*[_type=='booking' && user._ref == $userId]{
	_id,
	hotelRoom -> {
		_id,
		name,
		slug,
		price
	},
	checkinDate,
	checkoutDate,
	numberOfDays,
	adults,
	children,
	totalPrice,
	discount
}`;

export const getUserDataQuery = groq`*[_type=='user' && _id == $userId ][0]{
_id,
name,
email,
isAdmin,
about,
_createdAt,
image,
}`;

export const getRoomReviewsQuery = groq`*[_type == 'review' && hotelRoom._ref == $roomId]{
	_createdAt,
	_id,
	text,
	user -> {
		name
	},
	userRating
}`;
