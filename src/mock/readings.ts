export interface Reading {
	title: string;
	content: string;
	createdAt: Date;
	progress: number;
}

export const readings = [
	{
		title: "The Bees and The Bees",
		content: `According to all known laws of aviation, there is no way a bee should be able to fly.
Its wings are too small to get its fat little body off the ground.
The bee, of course, flies anyway because bees don't care what humans think is impossible.
Yellow, black. Yellow, black. Yellow, black. Yellow, black.
Ooh, black and yellow!
Let's shake it up a little.
Barry! Breakfast is ready!
Coming!
Hang on a second.
Hello?
Barry?
Adam?
Can you believe this is happening?
I can't.
I'll pick you up.
Looking sharp.
Use the stairs, Your father paid good money for those.
Sorry. I'm excited.
Here's the graduate.
We're very proud of you, son.
A perfect report card, all B's.
Very proud.
Ma! I got a thing going here.
You got lint on your fuzz.
Ow! That's me!
Wave to us! We'll be in row 118,000.
Bye!
Barry, I told you, stop flying in the house!
Hey, Adam.
Hey, Barry.
Is that fuzz gel?
A little. Special day, graduation.
Never thought I'd make it.
Three days grade school, three days high school.
Those were awkward.
Three days college. I'm glad I took a day and hitchhiked around The Hive.
You did come back different.
Hi, Barry. Artie, growing a mustache? Looks good.
Hear about Frankie?
Yeah.
You going to the funeral?
No, I'm not going.
Everybody knows, sting someone, you die.
Don't waste it on a squirrel.
Such a hothead.
I guess he could have just gotten out of the way.
I love this incorporating an amusement park into our day.
That's why we don't need vacations.
Boy, quite a bit of pomp under the circumstances.
Well, Adam, today we are men.
We are!
Bee-men.
Amen!
Hallelujah!`,
		createdAt: new Date(),
		progress: 0,
	},
	{
		title: "The Ogre and The Donkey",
		content: `Once upon a time there was a lovely princess. But she had an enchantment upon her of a fearful
sort, which could only be broken by Love's first kiss. She was locked away in a castle guarded by a
terrible fire breathing dragon. Many brave knights had attempted to free her from this dreadful
prison, but none prevailed. She waited in the dragon's keep in the highest room of the tallest tower
for her true love and true love's first kiss. Like that's ever going to happen. What a loony. Shrek
Beware Stay out I think he's in here. All right. Lets get it! Hold on. Do you know what that thing can
do to you? Yeah. He'll groan into your bones for his brains. Well actually that would be a giant. Now
Ogres, huh, they are much worse. They'll make a soup from your freshly peeled skin. They'll chew
your livers, squeeze the jelly from your eyes. Actually, it's quite good on toast. Back, back beast,
back! I warned you! Right. This is the part, where you run away. Yeah! And stay out. Wanted.
Fairytale creatures. Right, this one is full. Take it away. Give me that. Your fine days are over. -25
pieces of silver for the witch. Next. -Come on. Sit down there! And be quiet! This cage is so small.
You wouldn't turn me in. I'll never be stubborn again. I can change. Please, give me another chance.
Oh, shut up! Next. What do we got? This little wooden puppet. I'm not a puppet, I'm a real boy. Five
shillings for the possessed toy. Take it away. No! Please, don't let them do it! Next. What do you
got? Well, I've got a talking donkey! Right. Well that's good for ten schillings, if you can prove it. Oh,
go ahead fella. Well? He's just a li..., just a little nervous. He's really quite a chatterbox. You
boneheaded donkey! That's it. I have heard enough. Guards! No, no, he talks, he does! I can talk. I
love to talk. I've talked to... Get her out of my sight! -No, no, I swear! Hey, I can fly. -He can fly! -He
can fly! He can talk! -That's right, fool! Now I'm a flying, talking donkey! You might have seen house
fly, maybe even a superfly. But I bet you ain't never seen a donkey fly! Seize him! Get him! This way!
Hurry! You there. Ogre. -I. By the order of lord Farquaad. I am authorized to place you both under
arrest. And transport you to designated resettlement facility. Oh really? You and what army? Can I
say something to you? Listen, you were really, really something, back there. Incredible. Are you
talking to... ...me? Yes, I was talking to you. Can I just tell you that you were really great back there
with those guards. They thought that was all over there. And then you showed up and BAM. There
was tripping on over themselves like babes in the woods. That really made me feel good to see that.
Oh, that's great. Really. Man, it's good to be free. Now, why don't you go celebrate your freedom
with your own friends? But I... I don't have any friends. And I'm not going out there by myself. Hey
wait a minute. I have a great idea... I'll stick with you. You and me in green fighting machine.
Together we'll scare the spin if anybody crosses us. Oh, a, that was really scary. Maybe you don't
mine me saying. If that don't work, your breath will certainly do the job done, 'cause... you
definitively need some tic-tac or something, 'cause your breath stinks! Man you've ??? my note!
Just like the time... ...and then I ate some rotten berries. Man I had some strong gases leaking out of
my but that day. Why are you following me? I'll tell you why. 'Cause I'm all alone, there is no one
here, beside me. My problems have all gone. There's no one to derive me. But you got to have
free ... -Stop singing! Well, it's no wonder, you don't have any friends. Wow! Only a true friend
would be that truly honest. Listen! Little donkey. Take a look at me! What am I? A... ...really tall? No!
I'm an Ogre. You know, grab your torch and pitchforks. Doesn't that bother you? Nope. Really?
-Really really. Oh? Man, I like you. What's your name? A..., Shrek. Shrek?! But do you know, what I
like about you, Shrek? You've got that kind of: "I don't care what nobody thinks of me" thing. I like
that, I respect that, Shrek. You're all right. Uh, look at that. Who would wanna live in a place like
that? That would be my home. Oh, it is lovely. Just beautiful. You know you're quite a decorator. It's
amazing what you did with such a modest budget. I like that boulder. That is a nice boulder. I guess,
you don't entertain much, do you? I like my privacy. You know I do to. That's another thing, we have
in common. Like I hate it when you got somebody in your face. You try to give them a hint and they
won't leave. And then there's that big occurred silence, you know? Can I stay with you? -What? Can
I stay with you, please. Of course! -Really? No. -Please! I don't want to go back there. You don't
how is like to be concerned like a freak. Well..., maybe you do. But that's why we have to stick
together! You got to let me stay! Please! Please! OK, OK. -But one night only. -Huh, thank you!`,
		createdAt: new Date(new Date().getDate() - 2),
		progress: 0,
	},
	{
		title: "Keep is Stupid, Simple",
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
		createdAt: new Date(new Date().getDate() - 1),
		progress: 0,
	},
] satisfies Reading[];
