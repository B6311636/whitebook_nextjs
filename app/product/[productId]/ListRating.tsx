'use client'

import Avatar from "@/components/products/Avatar";
import Heading from "@/components/products/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import React from "react";

interface ListRatingProps {
    product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {

    if (product.reviews.length === 0) return null

    return <div>
        <Heading
            title="Product Reviews"
        />
        <div className="text-sm mt-2">
            {product.reviews && product.reviews.map(
                (review: any) => {
                    return <div key={review.id}
                        className="max-w-300px"
                    >
                        <div className="flex gap-2 items-center">
                            <div>
                                <Avatar src={review.user.image} />
                            </div>
                            <div>{review.user.name}</div>
                            <div>{moment(review.createdDate).fromNow()}</div>
                        </div>
                        <div className="mt-2">
                            {/* <Rating value={review.rating} readOnly />
                            <div className="ml-2">{review.comment}</div>
                            <hr className="my-4" /> */}
                        </div>
                    </div>
                }
            )}
        </div>
    </div>;
}

export default ListRating;