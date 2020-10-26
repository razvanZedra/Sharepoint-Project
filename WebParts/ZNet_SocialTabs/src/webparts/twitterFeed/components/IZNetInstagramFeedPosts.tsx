import * as React from "react";
import { Component } from "react";
import { Props } from "react-instagram-embed";
import { GetEmbedPosts as GetEmbedPosts } from "./IZNetInstagramFeedUtil";
import styles from "./ZNetSocialTabs.module.scss";



interface IPost {
    error: any;
    responseHtml: any;
    postLink: any;
}

// interface IProps {
//     responseHtml: string;
// }

interface IProps {
    postUrl: string;
    key: any;
}
 interface InstaPostProps{

    author_name: string;
    html: any;
    provider_name: string;
    provider_url: string;
    thumbnail_height: number;
    thumbnail_url: string;
    thumbnail_width: number;
    type: string;
    version: string;
    width: number;

 }

// const loadEmbedPosts = ({ responseHtml }, { error }):React.ReactElement => {

//     if (!error) {
//         return (
//             <div>
//                 <div dangerouslySetInnerHTML={{ __html: responseHtml }} />
//             </div>
//         );
//     }
//     else {
//         return (
//             <p>{error.message}</p>
//         );
//     }


// }


// const loadEmPosts =(postUrl) =>{

//     GetEmbedPosts ((res: { data: any; }, err: any) => {
//         // if (err) {
//         //     this.setState({ error: err });
//         // }
//         // else {
//             console.log(res.data);
//             loadEmbedPosts({responseHtml: res.data.html},err);
//             // this.setState({ responseHtml: res.data.html });
//         // }
//     }, postUrl)}

//     return
// }

// export const renderPostHtml = ({postLink}):React.ReactElement => {

//     return (

    

    
//     );

// }


// export class Post extends Component<{}, IState> {
export class Post extends Component<IProps, IPost> {   
    public loadEmbedPosts: () => JSX.Element;
    constructor(props: Readonly<IProps> ) {
        super(props);
        this.state = {
            error: null,
            responseHtml: null,
            postLink: this.props.postUrl
            // props: { id: any; permalink: string }
        };
        
        this.componentDidMount = () => {
            // window.instgrm.Embeds.process();
            GetEmbedPosts((res: InstaPostProps, err: any)  => {
                if (err) {
                    this.setState({ error: err });
                }
                else {
                    this.setState({ responseHtml: res.html });
                }
            },this.state.postLink);

        };

        this.loadEmbedPosts = () => {
            const { error } = this.state;
            if (!error) {
                return (
                    <div >
                        <div className={styles.instaIframe} key={this.props.key} dangerouslySetInnerHTML={{ __html: this.state.responseHtml }} />
                        
                    </div>
                    
                );
            }
            else {
                return (
                    <p key={this.props.key}>{error.message}</p>
                );
            }
        };
    }

    public render(): React.ReactElement<IPost> {
        return (
            this.loadEmbedPosts()
        );
    }


}
// function Post(props: { id: any; permalink: string }) {
//     return (
//         <div>

//         </div>
//     );
// }



// https://www.instagram.com/p/B9WdonrJppf&access_token=787184848772658|1efa93ed5b2dfdb0846d96ac3b7f9a7a