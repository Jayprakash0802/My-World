import Logo from "../assets/logo/logo-black.png"
const Temp = [
    {
        id: 1,
        thumbnail: Logo,
        category: "development",
        title: "Modernization of world",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam doloremque possimus, impedit eveniet libero rem consequuntur sapiente totam illum! Aspernatur aliquam tempora consequatur dolores ipsam alias, iste sint fuga voluptas eius velit, unde cupiditate, molestias magnam expedita repudiandae repellendus fugiat incidunt commodi veritatis numquam blanditiis quia? Asperiores nisi reprehenderit, vitae soluta est odio. Dolorem, impedit eum illo neque sit quod fugiat at id esse velit, sapiente non consectetur dignissimos, amet molestiae provident quam. Cum exercitationem recusandae illum voluptatem, earum consectetur accusamus quae repudiandae minus dolorum. Natus, inventore, veniam officia doloremque aut maiores hic fugiat in tempora porro dolorum repellat dignissimos rem corrupti illum? Sit quos provident odit fuga corporis facilis, qui magnam modi consequuntur excepturi eum reprehenderit, corrupti sunt explicabo velit nobis iure, voluptas ducimus accusantium beatae repudiandae suscipit amet! Earum debitis, cum provident",
        authorId: 3
    },
    {
        id: 2,
        thumbnail: Logo,
        category: "development",
        title: "Modernization of world",
        description: "lorem",
        authorId: 3
    },
    {
        id: 3,
        thumbnail: Logo,
        category: "development",
        title: "Modernization of world",
        description: "lorem",
        authorId: 3
    },
    {
        id: 4,
        thumbnail: Logo,
        category: "development",
        title: "Modernization of world",
        description: "lorem",
        authorId: 3
    }
]

const Authors = [
    {
        id: 1,
        avatar: Logo,
        name: "Paramone",
        posts: 1
    },
    {
        id: 2,
        avatar: Logo,
        name: "Major",
        posts: 2
    },
    {
        id: 3,
        avatar: Logo,
        name: "Commander",
        posts: 0
    },
    {
        id: 4,
        avatar: Logo,
        name: "Legend",
        posts: 3
    },
]

const categoriesData = [
    'Agriculture',
    'Business',
    'Education',
    'Entertainment',
    'Art',
    'Investment',
    'Weather',
    'Uncategorized'

]

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
    ],
};

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'script', 'indent', 'direction', 'size', 'color', 'background', 'font', 'align',
];


export { Temp, Authors, categoriesData, modules, formats };