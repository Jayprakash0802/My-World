import { Link, useParams } from "react-router-dom";
import { PostAuthor } from "../components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import DeletePost from "./DeletePost";

export default function PostDetail() {
    const { currUser } = useContext(UserContext)
    const [post, setPost] = useState(null)
    const [isLoading, setIsloading] = useState(false);
    // const token = currUser?.id
    const { id } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
                setPost(response?.data)
            } catch (err) {
                console.log("error")
            }
            setIsloading(false)
        }
        fetchPost()

    }, [id])
    if (isLoading) return <Loader />
    return (
        <>
            {post ?
                <section className="post-detail">
                    <div className="container post-detail__container">
                        <div className="post-detail__header">
                            <PostAuthor createdAt={post.createdAt} creator={post.creator}/>
                            {currUser?.id === post.creator && <div className="post-detail__buttons">
                                <Link to={`/posts/${id}/edit`} className="btn sm primary">Edit</Link>
                                <DeletePost id={id}/>
                            </div>}

                        </div>
                        <h1>{post.title}</h1>
                        <div className="post-detail__thumbnail">
                            <img src={post.thumbnail.url} alt="" />
                        </div>
                        <p dangerouslySetInnerHTML={{ __html:post.description }} className="post__content"></p>
                        <p className="post__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quam iure repellat culpa pariatur inventore repellendus sunt unde eum, ex ipsa voluptates? Laborum, blanditiis officiis? Fugiat quidem impedit animi magni distinctio cum necessitatibus architecto quae culpa, sed iusto sunt, ullam repellat quam sapiente. Sed quis nisi perferendis laudantium. Quas, sapiente voluptatum velit dolore soluta laudantium!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae totam ab ea ipsum? Iste alias facilis cumque minus consequuntur nulla, eius quae voluptatibus, nam cum officia ullam eaque cupiditate voluptatem perspiciatis amet excepturi delectus saepe! Cumque iusto placeat, velit corporis dignissimos in ad sequi esse reiciendis totam sed illum modi illo nemo officia, amet nisi quisquam quas sit. Consequuntur ab dicta reiciendis delectus minima consectetur officia dolorum eaque atque sapiente? Nesciunt consequuntur magnam rerum omnis voluptate, accusamus aliquam rem est et, recusandae beatae nemo autem molestias eius expedita architecto libero? Dolores vero ullam voluptatum architecto hic cumque, minus laborum quod doloremque aliquid autem dolorum quia est quos praesentium, nisi modi blanditiis fugit qui, consequuntur fuga dignissimos totam! Officiis, officia tempora voluptatem asperiores, magni a provident laborum fugit inventore doloribus, commodi aspernatur nam in dolorum harum reprehenderit est dolor incidunt! Perferendis, earum recusandae adipisci distinctio minus magni sint provident quibusdam libero voluptas! Odit dolore veritatis ipsam, assumenda accusantium, nulla in laborum minus ad at excepturi! Iusto commodi sunt tempora quis maiores, suscipit dolorum quo esse tempore dolore ab nisi nihil quidem harum voluptates enim, temporibus aliquid vero obcaecati architecto? Non, hic unde. Temporibus exercitationem nihil odit, dolore repudiandae doloremque et saepe corrupti possimus rem nostrum molestias eaque, at esse sunt! Magni est non ad maxime accusamus a recusandae corporis assumenda laudantium nam? Quo eaque commodi facilis esse accusamus saepe cum, obcaecati, adipisci sed consequatur neque. Illo natus atque tempora voluptate sequi distinctio dolor eum suscipit nemo deleniti provident alias quidem molestias non, blanditiis exercitationem quisquam tenetur, asperiores recusandae neque ipsa vero veniam, ullam amet. Tempore commodi dicta tempora minima est facere veritatis libero dolores a, modi natus corrupti et consectetur unde doloribus rem neque impedit debitis quaerat rerum. Unde omnis impedit, esse rem maxime odio aut pariatur vero illum sapiente doloribus?</p>
                    </div>
                </section>
                :
                <ErrorPage/>
        }
        </>
    )
}