- Today i'm going to work on Odin Blog APP .

- First I'll have to make a monorepo so that i could share dependencies across my frontend and backend.

- My webapp will have 2 frontends written in React ( 1 for viewer and 1 for author)

- I'll be using yarn since i read that it makes making monorepo easier compared to npm which is what i've been using since a year. So i'm new to yarn

- First i'll create a github repo (i'll share the link in description) for my blog web app.

- I like listening to music while coding . it gives a chill vibe. so i'll look for some copyright free songs so that YouTube doesn't messes up my steam :D

- Lets start coding.

- I have a tmux script which helps me keep jump to sessions immediately. Checkout my dotfiles for that.It's called tmux sessionizer. It's modified version of primeagens tmux sessionizer.

- I'll also have a common dir which will share dependencies used for both frontend and backend.
  Some fellow devs suggested to use zod which can be used for validating both frontend and backend so i might put that dependency there.

- Old habits die hard :D . I used npm to create my react app which i guess shouldn't have done since i'm using yarn lol.

- Now we are on same session so i don't have to jump mbetween my main and this session

- Hmm weird on react website , it does shows how to create react app using yarn but if i try to do that i get warning saying that it's depricated ? wtf ?

- Oh i think i know the reason now. since i'm setting up a monorepo , i need to make my root package.json private to.

- I need to add typescript as well XD

- Lets start fresh

- finally i have a template react app using yarn.

- seems like package name needs to be lowercase. alright i'll do it

- lets wait for one of them to finish because i'm not sure if they can work parallel or not

- so far experience is pretty bad compared to npm.

- cool , looks like i've setup most of the part of monorepo ?

- I'm not sure if i should add typescript here or in common.

- Ok this time it's downloading fast.

- Basically i'm confused whether to setup typescript for my backend and common individually or do i keep it separate. Hoping someone replies fast so that i could continue my work

- for now lets leave TS. i'm anyways going to work on my database schema for now :D

- Ohh i leaked my postgres password :D . well it's of no use since it will always run on my localhost so good time trying to use it lol.

- i have custom keybinds which opens a floating terminal and executes `psql` there

- i'm using vim dadbod plugin which is great btw. definately recommended

- Alright time to define my schema . It will have
- User schema -> to store users info
- Blog schema -> to store info about blogs
- Comment schema -> to store comments for blogs
- Finally Reaction schema -> to keep track of which user liked which blogs

- I think my schema is good.will spend some more minutes to see if i need anything else and then start working on backend.
- I added Cascade so that when a user gets deleted , his blogs get deleted as well and when a blog gets deleted , it's commonets and likes get deleted as well
- Our initial schema is done. so now when we perform operations on our backend,we'll get types in lsp as well
- Btw now since i have to start writing backend , it would require me to decide whether i want to use ts or not but since i haven't recieved any answer yet,i'm going to keep the stream short for today. will continue from here on next stream.

### See you guys . Bye Bye :D
