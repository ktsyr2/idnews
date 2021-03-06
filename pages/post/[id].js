import Head from "../../Component/head";
import Nav from "../../Component/nav/nav";
import axios from "axios";
import Title from "../../Component/title";
import { host } from "../../config.json";
import { sanitize } from '../../model/api'
import Link from 'next/link'
export default function Post({ props }) {
    let { title, content, date, image, author, tags, categories } = props

    return (
        <>
            <Head home="ID NEWS " />
            <Nav />
            <section className='post'>
                <div className='title' >
                    <Link href={`/`} passHref   >
                        <a >الرئيسية</a>
                    </Link>
                    <span> / </span>

                    <Link href={`/cat/` + categories[0].id} passHref   >
                        <a >{categories[0].name}</a>
                    </Link>
                    <span> / </span>
                    <p> {title} </p>
                </div>
                <div className='content'>
                    <h1>{title}</h1>
                    <span>{date.history} </span>
                    <span>{date.time.slice(0, 5)} </span>
                    <img src={image} alt={'Image' + title} />
                    <div
                        dangerouslySetInnerHTML={{ __html: sanitize(content) }} />

                </div>
                <div className='about'>
                    <div className='cats'>
                        <p>التصنيفات</p>
                        {categories.map((cat, index) => {
                            return (
                                <div key={index} className='item'>
                                    <Link href={'/cat/' + cat.id} >
                                        <a>{cat.name}</a>
                                    </Link>

                                </div>
                            )
                        })}
                    </div>
                    <div className='tags'>
                        <p>الوسوم</p>
                        {tags.map((cat, index) => {
                            return (
                                <div key={index} className='item'>
                                    <Link href={'/tags/' + cat.id}>
                                        <a  >{cat.name}</a>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='author' >
                    <img src={author.image['96']} />
                    <div >
                        <strong>{author.name} </strong>
                        <div dangerouslySetInnerHTML={{ __html: sanitize(author.description) }} />
                        <a href={author.website}>{author.website.split('/')[2]}</a>
                    </div>
                </div>
            </section>
        </>
    );
}
Post.getInitialProps = async (ctx) => {
    let { query } = ctx
    let url = host + "/api/posts/" + query.id
    let res = await axios.get(url, query)
    return { props: res.data, revalidate: 1 };
};
