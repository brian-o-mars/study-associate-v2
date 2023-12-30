import { Client} from "appwrite";

export const appWriteclient = () => {
    return new Client()
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);}
