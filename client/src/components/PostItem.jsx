import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";



export default function PostItem({ post }) {
    const { _id, thumbnail, category, title, description, creator, createdAt } = post;
    const tempDiv = document.createElement('div');

    // convert react-quill content to normal text
    
    tempDiv.innerHTML = description;
    const pElement = document.createElement('p');
    pElement.textContent = tempDiv.textContent;
    const plainHtmlContent = pElement.outerHTML;
    const descript = plainHtmlContent;
    // const descript = description;
    
    const shortDescription = descript.length > 60 ? descript.substr(0, 60) + '  ...' : descript;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '  ...' : title;
    
    return (
        <>
            <article className="post">
                <div className="post__thumbnail">
                    <img src={thumbnail.url} alt={title} />
                </div>
                <div className="post__content">
                    <Link to={`/posts/${_id}`}>
                        <h3>{postTitle}</h3>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html:shortDescription }}></p>
                    <div className="post__footer">
                        <PostAuthor createdAt={createdAt} creator={creator}/>
                        <Link to={`/posts/categories/${category}`} className="btn category">{category}</Link>
                    </div>
                </div>
            </article>
        </>
    )
}