import {defineField} from 'sanity';
// account - required
// because we are using account provider like github in this case it can be other also
const account = {
 name:'account',
 title:'Account',
 type:'document',
 fields:[
       defineField({
        name:"providerType",
        type: "string",
       }),
       defineField({
        name:"providerId",
        type: "string",
       }),
       defineField({
        name:"providerAccountId",
        type: "string",
       }),
       defineField({
        name:"refreshToken",
        type: "string",
       }), 
       defineField({
        name:"accessToken",
        type: "string",
       }), 
       defineField({
        name:"accessTokenExpires",
        type: "number",
       }),
       defineField({
       	name:'user',
       	title:'User',
       	type:'reference',
       	to: {type:'user'},
       })     
 	]
}
export default account