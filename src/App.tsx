import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Kuygudum from "./pages/kuygudum";
import Character from "./pages/character";

function App() {
    const [CharacterData, setCharacterData] = useState<any>(null);
    return (
        <>
            <Routes>
                <Route path="/" element={<Kuygudum setObj={setCharacterData} />} />
                <Route path="/character" element={<Character obj={CharacterData} />} />
            </Routes>
        </>
    );
}

export default App;
