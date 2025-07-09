'use client';

import { useEffect, useState } from "react";

type WeatherData = {
    weather: {
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    name: string;
};

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            // 取得した緯度経度を使って天気APIにリクエスト
            try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
            );
            const data = await res.json();
            setWeather(data);
            } catch (e) {
            setError("天気情報の取得に失敗しました");
            }
        },
        () => {
            setError("位置情報の取得を許可してください");
        }
        );
    }, []);

    if (error) return <p>{error}</p>;
    if (!weather) return <p>読み込み中…</p>;

    const iconCode = weather.weather[0].icon;
    // OpenWeatherMap では公式の天気アイコン画像。@4x.pngは約200px × 200pxで大きめアイコン用
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    return (
        <div className="text-center p-4 bg-slate-300/90 rounded-md w-full">
            <p className="text-3xl font-bold">現在: {weather.weather[0].description}</p>
            <p className="text-3xl font-bold">気温: {weather.main.temp.toFixed(1)}℃</p>
            <img src={iconUrl} alt={weather.weather[0].description} className="mx-auto w-40 h-40" />
        </div>
    );
}