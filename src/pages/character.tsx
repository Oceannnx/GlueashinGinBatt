import { useEffect } from "react";
import VideoBg from "../assets/nahida-bg.mp4";
import "../css/character.css";
import { useNavigate } from "react-router-dom";

const Character = ({ obj }: { obj: any }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!obj) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <video width="full" className="bg-video" autoPlay loop muted>
                <source src={VideoBg} type="video/mp4" />
            </video>

            <div id="character-container h-full">
                <div className="card2">
                    <div className="cardheader">
                        <h2>
                            {obj.name}
                            {console.log(obj)}
                        </h2>
                        <h3>{obj.title}</h3>
                        <p>
                            <strong>
                                Rarity:{" "}
                                <span className="character-rarity">
                                    {[...Array(Number(obj.rarity))].map(() => (
                                        <>★</>
                                    ))}
                                </span>
                            </strong>
                        </p>
                        <p>
                            <strong>
                                Element:
                                <span>{obj.element}</span>
                            </strong>
                        </p>
                        <p>
                            <strong>
                                Weapon:
                                <span>{obj.weapon}</span>
                            </strong>
                        </p>
                        <p>
                            <strong>
                                Nation:
                                <span>{obj.nation}</span>
                            </strong>
                        </p>
                        <p>
                            <strong>
                                affiliation:
                                <span>{obj.affiliation}</span>
                            </strong>
                        </p>
                    </div>
                </div>
                <div className="skilldetail">
                    <h1 className="skillname"></h1>
                    <p className="skilldes"></p>
                </div>
            </div>
            <div id="character-detail">
                <div id="detailcard"></div>
                <div id="character-skill"></div>
            </div>
        </>
    );
};

export default Character;
