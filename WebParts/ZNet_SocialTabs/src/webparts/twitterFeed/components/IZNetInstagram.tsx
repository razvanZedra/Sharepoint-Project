import InstagramEmbed from 'react-instagram-embed';
import styles from './ZNetSocialTabs.module.scss';
import * as React from 'react';
import { Component } from 'react';
import { Get_InstagramMedia } from './IZNetInstagramFeedUtil';
import { Get_InstagramRefreshToken } from './IZNetInstagramFeedUtil';





interface IState {
    posts: any;
    error: any;
}
function Post(props: { id: any; permalink: string }) {
    return (
        <div>
            <InstagramEmbed
                url={props.permalink}
                maxWidth={800}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => { }}
                onSuccess={() => { }}
                onAfterRender={() => { }}
                onFailure={() => { }}
                className={styles.instaIframe}
            />
        </div>
    );
}

export class InstaPosts extends Component<{}, IState> {
    public loadInstagramPosts: () => JSX.Element;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            posts: [],
            error: null
        };

        this.componentDidMount = () => {
            Get_InstagramMedia((res: { data: any; }, err: any) => {
                if (err) {
                    this.setState({ error: err });
                }
                else {
                    console.log(res.data);

                    this.setState({ posts: res.data });
                }
            });
        };

        this.loadInstagramPosts = () => {
            const { posts, error } = this.state;
            if (!error) {
                return (
                    <div>
                        {
                            posts.slice(0,2).map((post: { id: any; permalink: string; }) => (

                                <div><Post id={post.id} permalink={post.permalink} /></div>
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

