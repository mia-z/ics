import React, { useEffect, useState } from "react";

export default function useBackgrounding(parentTickers, childTickers, activityName, parentUpdateFn) {
    const [tickers, setTickers] = useState(childTickers);

    useEffect(() => {
        setTickers(childTickers);
    }, [childTickers])

    //UNDER CONSTRUCTION
}