import { useEffect, useRef, useState } from "react";
import setNoAvatarIcon from "../../util/noAvatarIcon";
//import { FastAverageColor } from 'fast-average-color';
import client from "../Client";
import { User } from "../Syrenity";
import { bound } from "../../util/coordinates";

let updateViewer: (user: User, element: HTMLElement) => void = () => {};
let hideViewer: () => void;
let lastOpen: number = 0;
let lastRect: DOMRect | null = null;


// TODO: Make it show the average color for the viewer header
export default function UserProfileViewer() {
  const [currentUser, setCurrentUser] = useState<User>();
  const [coordinates, setCoordinates] = useState<{x: Number, y: Number}>({ x: 0, y: 0 });
  const [visibility, setVisbility] = useState<"block" | "none">("none");
  const userViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateViewer = (user, element) => {
      lastOpen = Date.now();
      setCurrentUser(user);

      let rect = element.getBoundingClientRect();

      setVisbility("block");
      if (!lastRect) {
        setTimeout(() => {
          setCoordinates(bound({ 
            x: rect.x + rect.width, 
            y: rect.y }, 
            lastRect || (userViewerRef.current as HTMLDivElement).getBoundingClientRect())
          );

          setTimeout(() => {
            lastRect = (userViewerRef.current as HTMLElement).getBoundingClientRect();
          }, 100);
        }, 100);
      } else {
        setCoordinates(bound({ 
          x: rect.x + rect.width, 
          y: rect.y }, 
          lastRect || (userViewerRef.current as HTMLDivElement).getBoundingClientRect())
        );

        setTimeout(() => {
          lastRect = (userViewerRef.current as HTMLElement).getBoundingClientRect();
        }, 100);
      }
    }

    hideViewer = () => {
      if (50 - (Date.now() - lastOpen) < 0)
        setVisbility("none");
    }
  }, []);

  return (
    <div ref={userViewerRef} className="user-profile-container" style={{ display: visibility, top: coordinates.y + "px", left: coordinates.x + "px" }}>
      <div className="user-profile-header"></div>
      <img
        src={currentUser?.avatar || "null"}
        onError={({currentTarget}) => setNoAvatarIcon(currentUser?.id || 0, currentTarget) }
        alt="" 
        className="user-profile-avatar" />
      <div className="user-profile-content">
        <b>{currentUser?.username || "Loading..."}</b>
        <hr />
        <label className="user-profile-title">Syrenity Member Since</label>
        <small>{currentUser?.createdAt?.toLocaleString() || "Loading..."}</small>
      </div>
    </div>
  );
}

export async function showForUser(userId: number, element: HTMLElement) {
  const user = await client.user(userId).fetch();
  updateViewer(user, element);
}

export {hideViewer};