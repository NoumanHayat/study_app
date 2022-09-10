import React, { useCallback, useContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';
import {
  USERS,
  FOLLOWING,
  TRENDING,
  CATEGORIES,
  ARTICLES,
} from '../constants/mocks';
import {
  IArticle,
  ICategory,
  IProduct,
  IUser,
  IUseData,
  ITheme,
} from '../constants/types';
import { light, dark } from '../constants';
import { en, ch } from '../constants/translations';
export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [translations, setTranslations] = useState(en);
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [following, setFollowing] = useState<IProduct[]>(FOLLOWING);
  const [trending, setTrending] = useState<IProduct[]>(TRENDING);
  const [categories, setCategories] = useState<ICategory[]>(CATEGORIES);
  const [articles, setArticles] = useState<IArticle[]>(ARTICLES);
  const [article, setArticle] = useState<IArticle>({});
  const [data, setData] = useState([]);
  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem('isDark');

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  const changeLanguage = useCallback(async () => {
    // get preferance gtom storage
    const language = await Storage.getItem('Language');

    if (language == null || language == 'English' || language == undefined) {
      setTranslations(ch);
      await Storage.setItem('Language', 'Chinese');
    } else {
      setTranslations(en);
      await Storage.setItem('Language', 'English');
    }
  }, []);
  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );
  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);
  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers],
  );
  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );
  // handle Article
  const handleArticle = useCallback(
    (payload: IArticle) => {
      // set article / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(article)) {
        setArticle(payload);
      }
    },
    [article, setArticle],
  );
  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);
  const displayTime = (centiseconds: number) => {
    let seconds = 0;
    let minutes = 0;
    if (centiseconds < 0) {
      centiseconds = 0;
    }

    if (centiseconds < 1000) {
      return `00:00:${padToTwo(centiseconds)}`
    }

    let remaincentiseconds = centiseconds % 1000;
    seconds = (centiseconds - remaincentiseconds) / 1000;

    if (seconds < 60) {
      return `00:${padToTwo(seconds)}:${padToTwo(remaincentiseconds)}`;
    }



    let remainseconds = seconds % 60;
    minutes = (seconds - remainseconds) / 60;
    return `${padToTwo(minutes)}:${padToTwo(remainseconds)}:${padToTwo(remaincentiseconds)}`;
  }

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    translations,
    changeLanguage,
    user,
    users,
    handleUsers,
    handleUser,
    following,
    setFollowing,
    trending,
    setTrending,
    categories,
    setCategories,
    articles,
    setArticles,
    article,
    handleArticle,
    data, setData,
    displayTime
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
