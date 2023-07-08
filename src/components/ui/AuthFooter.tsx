import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import i18nConfig from '../../../i18n.json'
import Link from 'next/link';
import setLanguage from 'next-translate/setLanguage'
import useLocalStorage from '../../shared/hooks/useLocalStorage';

function AuthFooter() {
    const {lang,t} = useTranslation("common")
    const {languages} = i18nConfig
    const [language, setLocalLanguage] = useLocalStorage("language", lang)

    const handleChange = (event) => {
      setLanguage(event.target.value as string);
      setLocalLanguage(event.target.value as string);
    };
  
  return (
    <div className='flex justify-between items-center text-primary dark:text-dark text-sm mt-4'>
        <div>
            
        <FormControl fullWidth className='text-primary dark:text-dark text-xs language-select '>
          <Select
            value={lang}
            onChange={handleChange}
            className='text-xs dark:text-[#ddd]'
            size="small"
          >
            {languages?.map(lan=>{
              return(
                <MenuItem key={lan.value} value={lan.value}>{lan.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        </div>
        <div className='flex items-center gap-8 text-xs'>
            <Link className='text-primary dark:text-[#ddd] no-underline' href={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/help`}>{t('help')}</Link>
            <Link className='text-primary dark:text-[#ddd] no-underline' href={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/privacy`}>{t('privacy')}</Link>
            <Link className='text-primary dark:text-[#ddd] no-underline' href={`${process.env.NEXT_PUBLIC_WEB_APP_URL}/terms`}>{t('terms')}</Link>
        </div>
    </div>
  )
}

export default AuthFooter