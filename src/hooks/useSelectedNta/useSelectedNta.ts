import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import ntas from "@data/ntas.json";
import { NtaIndicatorRecord } from "../types/Nta";

export const useSelectedNta = (setSelectedNta: Dispatch<SetStateAction<any>>, router) => {
    const { geoid } = router.query;

    let selectedNtaId: string | null = geoid ? geoid : null;
    
    // This function is a helper that makes a type-safe wrapper for Object.hasOwnProperty
    // Normally we would move this somewhere sharable but since most of this code will likely only
    // be temporary, it's fine for now
    function hasOwnProperty<T>(obj: T, key: PropertyKey): key is keyof T {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    if(selectedNtaId !== null && hasOwnProperty(ntas, selectedNtaId)) {
      setSelectedNta(ntas[selectedNtaId])
    } else {
      setSelectedNta(null);
    }
};
