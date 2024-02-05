import {defineField} from 'sanity'
// verification-token - only if you use email provider
const verificationToken = {
name:"verification-token",
title:"Verification Token",
type:"document",
fields:[
     defineField({
     	name:'identifier',
     	title:'Identifier',
     	type:'string',
     }),
     defineField({
     	name:'token',
     	title:'Token',
     	type:'string',
     }),
     defineField({
     	name:'expired',
     	title:'Expires',
     	type:'datetime',
     }),
	]
}

export default verificationToken;