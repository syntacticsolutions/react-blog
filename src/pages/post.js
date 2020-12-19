import React, {useEffect, useRef} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {Button} from 'antd';
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {GET_POST_QUERY} from '../queries/posts';


export default function PostViewer () {
    const contentContainer = useRef(null)
    const {id} = useParams()
    let history = useHistory();

    const {data, error, loading} = useQuery(GET_POST_QUERY, {
        variables: {
            id
        }
    })

    const editPost = () => history.push({ 
        pathname: '/edit-post',
        state: {
            data
        }
    })

    useEffect(() => {
        if(contentContainer.current !== null) {
            const article = document.createElement('article')
            const options = {
                readOnly: true,
                modules: {
                    toolbar: '#toolbar'
                  }
            }

            new Quill(article, options)

            setTimeout(() => { contentContainer.current.appendChild(article) }, 0)
        }
    },[data])

    return (
        <main className="post-viewer">
            <Button type="primary" onClick={editPost}>Edit Post</Button>
            <section ref={contentContainer}></section>
        </main>
    )
}