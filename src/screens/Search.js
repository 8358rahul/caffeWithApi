import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import {FormInput} from '../components';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import AuthLayout from './AuthLayout';

const Search = () => {
  return (
    <View style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',   
    }}>
        <FormInput 
            label="Search"
            placeholder="Search"
            autoCompleteType="search"
            returnKeyType="search"
            onSubmitEditing={() => {}}
            onChange={() => {}}
            appendComponent={
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={icons.search}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.gray,
                        }}
                        />
                </View>
            }

            />    
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})