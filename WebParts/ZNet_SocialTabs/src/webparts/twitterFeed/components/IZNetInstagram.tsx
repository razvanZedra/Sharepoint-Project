import InstagramEmbed from 'react-instagram-embed';
import styles from './ZNetSocialTabs.module.scss';
import * as React from 'react';
import { Component } from 'react';
import { Get_InstagramMedia, Get_InstagramRefreshToken } from './IZNetInstagramFeedUtil';
import { Post } from './IZNetInstagramFeedPosts';
// import { Post } from './IZNetInstagramFeedPosts';

import { SPComponentLoader } from '@microsoft/sp-loader';



interface IState {
    posts: any;
    error: any;
}


export class InstaPosts extends Component<{}, IState> {
    public loadInstagramPosts: () => JSX.Element;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            posts: [],
            error: null
        };
        SPComponentLoader.loadScript('//instagram.com/static/bundles/es6/EmbedSDK.js/47c7ec92d91e.js');
        this.componentDidMount = () => {


        
            
            Get_InstagramRefreshToken((res: { data: any; }, err: any) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(res.data);
                }
            });
            Get_InstagramMedia((res: { data: any; }, err: any) => {
                if (err) {
                    this.setState({ error: err });
                }
                else {
                    console.log(res.data);

                    this.setState({ posts: res.data });
                }
            });
            setTimeout(()=>{
                if (window.instgrm)
                window.instgrm.Embeds.process();
            },500);
        };

        this.loadInstagramPosts = () => {
            const { posts, error } = this.state;
            if (!error) {
                return (
                    <div>
                        {
                            posts.slice(0,2).map((post: { id: any; permalink: string; }) => (
                                // <div key={post.id} ><Post postUrl={post.permalink}  /></div>
                            <div><Post  key={post.id} postUrl={post.permalink}></Post></div>
                            
                            ))
                        }
                    </div>
                );
            }
            else {
                return (
                    <p>{error.message}</p>
                );
            }
        };
    }

    public render(): React.ReactElement<IState> {
        return (
            this.loadInstagramPosts()
            
        );
    }
}

