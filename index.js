import express from "express"
import bodyParser from "body-parser";
import session from "express-session"

const port = 3000
const app = express();
app.use(bodyParser.urlencoded ({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
  }));

app.get("/", (req,res)=>{
    
    res.render('index.ejs')
});

app.post('/submit', (req,res) => {
    const inputPassword = req.body.password
    const correctPassword = "ihatecoding"
    if (correctPassword === inputPassword){
        
        res.locals.password = inputPassword
        res.render('index.ejs',{
            password: true
        });
        } else {
            
            res.sendStatus(401);
            res.send ('Wrong Password! Try Again.') // wait 10 seconds and redirect back to root
            // setTimeout(()=>{res.redirect('/')},600)
        };
})
app.post('/submitBlog', (req,res) => {
    const blogTitle = req.body.title;
    const bodyContent = req.body.body;
   
    
    res.render('blog.ejs',{
        blogTitle: blogTitle, 
        bodyContent: bodyContent,
        password: true 
    });
  });

app.get("/blog", (req,res)=>{
    res.render('index.ejs')
});

app.get("/blogpost", (req,res)=>{
  const blogPost = req.session.blogPost;
  res.render('index.ejs', { blogTitle: blogPost.title, bodycontent: blogPost.body });
  req.session.blogPost = null;
});
     
app.use((req, res) => {
    const error = new Error("Not Found");
    error.status = 404;
    return res.sendStatus(error.status);
});

app.listen(port, () => console.log(`Listening on ${port}`));