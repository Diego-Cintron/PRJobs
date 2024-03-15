interface Posting {
    post_id: number;
    user_id: number;
    cm_id: number;
    post_title: string;
    post_description: string;
    post_address: string;
    post_municipality: string;
    post_uploaded: Date;
    post_expires: Date;
}

export default Posting;