import { useEffect, useState } from "react";
import VideoBg from "../assets/nahida-bg.mp4";
import "../css/kuygudam.css";
import axios from "axios";
import { ListImg } from "../assets/ListImg";
import { useNavigate } from "react-router-dom";

const Kuygudum = ({ setObj }: { setObj: any }) => {
    const navigate = useNavigate();
    const [characterList, setCharacterList] = useState<any[]>([]);

    function fetchCharacterDetails(character: any) {
        axios
            .get(`https://api.genshin.dev/characters/${character}`)
            .then((result) => {
                setCharacterList((prev) => [...prev, result.data]);
            })
            .catch((error) => {
                console.log(
                    `Error fetching details for character '${character}':`,
                    error
                );
            });
    }

    const FindSrc = (name: string, vision: string) => {
        if (name == "Ayato") name = "Kamisato Ayato";
        if (name == "Traveler" && vision == "Anemo") name = "Traveler Anemo";
        if (name == "Traveler" && vision == "Dendro") name = "Traveler Dendro";
        if (name == "Traveler" && vision == "Electro")
            name = "Traveler Electro";
        if (name == "Traveler" && vision == "Geo") name = "Traveler Geo";

        let newName = name.replace(" ", "_");

        return ListImg.find((result) => newName === result.name)?.img;
    };

    useEffect(() => {
        axios.get("https://api.genshin.dev/characters/").then((result) => {
            // console.log(result.data);
            result.data.map((e: any, index: number) => {
                fetchCharacterDetails(e);
            });
        });
    }, []);

    return (
        <>
            <video width="full" className="bg-video" autoPlay loop muted>
                <source src={VideoBg} type="video/mp4" />
            </video>

            <div className="content">
                <div className="mb-1">
                    <strong>GlueaChing GinBatt</strong>
                </div>
                <div className="mt-0">Genshin Impact Information</div>
            </div>

            <div id="character-container">
                <div id="character-list">
                    {characterList.map((e: any, index: number) => {
                        // console.log(e);
                        return (
                            <button
                                onClick={async() => {
                                    await setObj(e);
                                    navigate("/character");
                                }}
                            >
                                <div
                                    className="character-card"
                                    id={String(index) + String(e.name)}
                                >
                                    <div className="character-name">
                                        {e.name}
                                    </div>
                                    <div className="character-info">
                                        <div className="card-detail">
                                            <strong>Element: {e.vision}</strong>
                                        </div>
                                        <div className="card-detail">
                                            <strong>
                                                Rarity:
                                                <span className="character-rarity">
                                                    {[
                                                        ...Array(
                                                            Number(e.rarity)
                                                        ),
                                                    ].map(() => (
                                                        <>★</>
                                                    ))}
                                                </span>
                                            </strong>
                                        </div>

                                        <div className="m-2 flex justify-center">
                                            <img
                                                className="character-image"
                                                src={FindSrc(e.name, e.vision)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Kuygudum;
