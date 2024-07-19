import Navbar from './navbar';
import { auth } from './auth';

export default async function Nav() {
    console.log("this is a change here")
    console.log("this is a change here")
    console.log("this is a change here")
    console.log("this is a change here")
    console.log("this is a change here")
  const session = await auth();
  return <Navbar user={session?.user} />;
}
