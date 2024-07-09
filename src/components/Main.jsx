import { useEffect, useRef, useState } from 'react';
import { Event } from './Event'
import { TABS, TABS_KEYS } from '../const/tabs.js';

export const Main = () => {
    const ref = useRef();
    const [activeTab, setActiveTab] = useState(
        () => new URLSearchParams(location.search).get('tab') || 'all');
    const [hasRightScroll, setHasRightScroll] = useState(false);
    
    useEffect(() => {
        const checkScroll = () => {
            if (ref.current) {
                const { scrollWidth, clientWidth } = ref.current;
                setHasRightScroll(scrollWidth > clientWidth);
            }
        };
        
        checkScroll();
        
        window.addEventListener('resize', checkScroll);
        
        return () => {
            window.removeEventListener('resize', checkScroll);
        }
        
    }, [activeTab]);
    
    const onArrowClick = () => {
        ref.current.scrollBy({ left: 400, behavior: 'smooth' });
    };
    
    return <main className="main">
        <section className="section main__general">
            <h2 className="section__title section__title-header section__main-title">Главное</h2>
            <div className="hero-dashboard">
                <div className="hero-dashboard__primary">
                    <h3 className="hero-dashboard__title">Привет, Геннадий!</h3>
                    <p className="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
                    <ul className="hero-dashboard__info">
                        <li className="hero-dashboard__item">
                            <div className="hero-dashboard__item-title">Дома</div>
                            <div className="hero-dashboard__item-details">
                                +23
                                <span className="a11y-hidden">°</span>
                            </div>
                        </li>
                        <li className="hero-dashboard__item">
                            <div className="hero-dashboard__item-title">За окном</div>
                            <div className="hero-dashboard__item-details">
                                +19
                                <span className="a11y-hidden">°</span>
                                
                                <div
                                    className="hero-dashboard__icon hero-dashboard__icon_rain"
                                    role="img"
                                    aria-label="Дождь"
                                ></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul className="hero-dashboard__schedule">
                    <Event
                        icon="temp"
                        iconLabel="Температура"
                        title="Philips Cooler"
                        subtitle="Начнет охлаждать в 16:30"
                    />
                    <Event
                        icon="light"
                        iconLabel="Освещение"
                        title="Xiaomi Yeelight LED Smart Bulb"
                        subtitle="Включится в 17:00"
                    />
                    <Event
                        icon="light"
                        iconLabel="Освещение"
                        title="Xiaomi Yeelight LED Smart Bulb"
                        subtitle="Включится в 17:00"
                    />
                </ul>
            </div>
        </section>
        
        <section className="section main__scripts">
            <h2 className="section__title section__title-header">Избранные сценарии</h2>
            
            <ul className="event-grid">
                <Event
                    slim={true}
                    icon="light2"
                    iconLabel="Освещение"
                    title="Выключить весь свет в доме и во дворе"
                />
                <Event
                    slim={true}
                    icon="schedule"
                    iconLabel="Расписание"
                    title="Я ухожу"
                />
                <Event
                    slim={true}
                    icon="light2"
                    iconLabel="Освещение"
                    title="Включить свет в коридоре"
                />
                <Event
                    slim={true}
                    icon="temp2"
                    iconLabel="Температура"
                    title="Набрать горячую ванну"
                    subtitle="Начнётся в 18:00"
                />
                <Event
                    slim={true}
                    icon="temp2"
                    iconLabel="Температура"
                    title="Сделать пол тёплым во всей квартире"
                />
            </ul>
        </section>
        
        <section className="section main__devices">
            <div className="section__title">
                <h2 className="section__title-header">
                    Избранные устройства
                </h2>
                <ul role="tablist" className="section__tabs">
                    {TABS_KEYS.map(key => {
                        const isActive = key === activeTab;
                        
                        return (<li
                            key={key}
                            role="tab"
                            aria-selected={isActive ? 'true' : 'false'}
                            tabIndex={isActive ? '0' : undefined}
                            className={'section__tab' + (isActive ? ' section__tab_active' : '')}
                            id={`tab_${key}`}
                            aria-controls={`panel_${key}`}
                            onClick={() => setActiveTab(key)}
                        >
                            {TABS[key].title}
                        </li>)
                    })}
                </ul>
            </div>
            
            <div className="section__panel-wrapper">
                <div ref={ref} role="tabpanel" className="section__panel" aria-hidden="false"
                     id={`panel_${activeTab}`}
                     aria-labelledby={`tab_${activeTab}`}>
                    <ul className="section__panel-list">
                        {TABS[activeTab].items.map((item, index) => <Event key={index} {...item} />)}
                    </ul>
                </div>
                {hasRightScroll &&
                    <div className="section__arrow" onClick={onArrowClick}></div>
                }
            </div>
        </section>
    </main>;
}
