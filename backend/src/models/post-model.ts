import mongoose from "mongoose";

interface IPost extends Document {
	user: mongoose.Types.ObjectId
	text: string
	img: string
	likes: mongoose.Types.ObjectId[]
	comments: IComment[]
}
interface IComment extends Document {
	user: mongoose.Types.ObjectId
	text: string
	createdAt: Date
	updatedAt: Date
}


const postSchema = new mongoose.Schema<IPost>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
		},
		img: {
			type: String,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				text: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
			},
		],
	},
	{ timestamps: true, collection: "posts" }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;