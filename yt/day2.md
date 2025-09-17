Welcome back fellow nerds . Today i'll be continuing my blog app from where i left yesterday.I did have to spend some time troubleshooting some typescript quirks offline since as you know its my first time working in a monorepo.Anyways lets begin.

Atm i'll only lay out the structure and not go into tiny details like validating and sanitizing inputs recieved from clients.I've decided i'll do it later , first i'll define routes and controllers.

- For validating and sanitizing i'll be using zod both in cilent and server side. it provides you to define schemas to match aginst

- For now i won't be working on jwt

- So now that we've worked on signup and login , time for display all existing blogs

Our app will have 3/4 kind of user

1. people who haven't created account ( they can view blogs)
2. `Role` User -> Can view blogs , crud like/dislike them and even crud comment them.
3. `Role` Author -> Can crud blogs and i am not sure but maybe all other things available for normal user ? for now we'll assume it a yes.
4. `Role` Admin -> As the name suggests , can do anything . CRUD blogs of any author , comments of any user , CRUD user accounts as well.

Lets focus on blogs for now.

- Creating blogs
