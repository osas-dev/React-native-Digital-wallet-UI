import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	Modal,
	FlatList,
	KeyboardAvoidingView,
	ScrollView
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({navigation}) => {

	const [showPassword, setShowPassword] = React.useState(false);

	const [areas, setAreas] = React.useState([]);
	const [selectedArea, setSelectedArea] = React.useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={{ padding: SIZES.padding, flexDirection: 'row' }}
				onPress={() => {
					setSelectedArea(item)
					setModalVisible(false)
				}}
			>
				<Image
					source={{ uri: item.flag }}
					style={{
						width: 30,
						height: 30,
						marginRight: 10
					}}
					resizeMode="contain"
				/>
				<Text style={{ ...FONTS.body4 }}>{item.name}</Text>
			</TouchableOpacity>
		)
	}

	React.useEffect(() => {
		fetch("https://restcountries.com/v2/all")
			.then(response => response.json())
			.then((data) => {
				let areaData = data.map(item => {
					return {
						code: item.alpha2Code,
						name: item.name,
						callingCode: `+${item.callingCodes[0]}`,
						flag: `https://countryflagsapi.com/png/${item.alpha2Code}`
					}
				});
				setAreas(areaData);

				if (areaData.length > 0) {
					let defaultData = areaData.filter(a => a.code == "NG")

					if (defaultData.length > 0) {
						setSelectedArea(defaultData[0]);
					}
				}
			}).catch(err => {
				console.log(err);
			});
	}, [])

	function renderHeader() {
		return (
			<TouchableOpacity
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginTop: SIZES.padding * 2,
					paddingHorizontal: SIZES.padding * 2
				}}
				onPress={() => console.log("SignUp")}
			>
				<Image
					source={icons.back}
					resizeMode="cover"
					style={{
						width: 20,
						height: 20,
						tintColor: COLORS.white
					}}
				/>

				<Text
					style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}
				>Sign Up</Text>
			</TouchableOpacity>
		)
	}

	function renderLogo() {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 5,
					height: 100,
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Image
					source={images.wallieLogo}
					resizeMode="contain"
					style={{
						width: "60%"
					}}
				/>
			</View>
		)
	}

	function renderForm() {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 3,
					marginHorizontal: SIZES.padding * 3,
				}}
			>
				{/* Full Name */}
				<View
					style={{
						marginTop: SIZES.padding * 3,
					}}
				>
					<Text
						style={{
							color: COLORS.lightGreen, ...FONTS.body3
						}}
					>Full Name</Text>
					<TextInput
						style={{
							marginVertical: SIZES.padding,
							borderBottomColor: COLORS.white,
							borderBottomWidth: 1,
							height: 40,
							color: COLORS.white,
							...FONTS.body3
						}}
						placeholder="Enter Full Name"
						placeholderTextColor={COLORS.white}
						selectionColor={COLORS.white}
					/>

					{/* Phone Number */}
					<View style={{ marginTop: SIZES.padding * 2 }}>
						<Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Phone Number</Text>

						<View style={{ flexDirection: "row" }}>
							{/* Country Code */}
							<TouchableOpacity
								style={{
									width: 100,
									height: 50,
									marginHorizontal: 5,
									borderBottomColor: COLORS.white,
									borderBottomWidth: 1,
									flexDirection: "row",
									...FONTS.body2
								}}
								onPress={() => setModalVisible(true)}
							>
								<View style={{ justifyContent: "center" }}>
									<Image
										source={icons.down}
										style={{
											width: 10,
											height: 10,
											tintColor: COLORS.white,
										}}
									/>
								</View>
								<View style={{ justifyContent: "center", marginLeft: 7 }}>
									<Image
										source={{ uri: selectedArea?.flag }}
										resizeMode="contain"
										style={{
											width: 30,
											height: 30
										}}
									/>
								</View>
								<View style={{ justifyContent: "center", marginLeft: 7 }}>
									<Text style={{ color: COLORS.white, ...FONTS.body3 }}>{selectedArea?.callingCode}</Text>
								</View>
							</TouchableOpacity>

							{/* Phone Number Input */}
							<TextInput
								style={{
									flex: 1,
									marginVertical: SIZES.padding,
									borderBottomColor: COLORS.white,
									borderBottomWidth: 1,
									height: 40,
									color: COLORS.white,
									...FONTS.body3
								}}
								placeholder="Enter Phone Number"
								placeholderTextColor={COLORS.white}
								selectionColor={COLORS.white}
							/>
						</View>
					</View>

					{/* Password */}
					<View style={{ marginTop: SIZES.padding * 2 }}>
						<Text
							style={{
								color: COLORS.lightGreen,
								...FONTS.body3
							}}
						>Password</Text>
						<TextInput
							style={{
								marginVertical: SIZES.padding,
								borderBottomColor: COLORS.white,
								borderBottomWidth: 1,
								height: 40,
								color: COLORS.white,
								...FONTS.body3
							}}
							placeholder="Enter Password"
							placeholderTextColor={COLORS.white}
							selectionColor={COLORS.white}
							secureTextEntry={!showPassword}
						/>
						<TouchableOpacity
							style={{
								position: "absolute",
								right: 0,
								bottom: 10,
								height: 30,
								width: 30
							}}
							onPress={() => setShowPassword(!showPassword)}
						>
							<Image
								source={showPassword ? icons.disable_eye : icons.eye}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.white
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	function renderButton() {
		return (
			<View style={{ margin: SIZES.padding * 3 }}>
				<TouchableOpacity
					style={{
						height: 60,
						backgroundColor: COLORS.black,
						borderRadius: SIZES.radius / 1.5,
						alignItems: "center",
						justifyContent: "center"
					}}
					onPress={() => navigation.navigate("Home")}
				>
					<Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
				</TouchableOpacity>

			</View>
		)
	}
	
	
	function renderAreaCodesModal() {


		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
			>
				<TouchableWithoutFeedback
					onPress={() => setModalVisible(false)}
				>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View
							style={{
								height: 400,
								width: SIZES.width * 0.8,
								backgroundColor: COLORS.lightGreen,
								borderRadius: SIZES.radius
							}}
						>
							<FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
								initialNumToRender={10}
                            />

						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		)
		}

		return (
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : null}
				style={{ flex: 1 }}
			>
				<LinearGradient
					colors={[COLORS.lime, COLORS.emerald]}
					style={{ flex: 1 }}
				>
					<ScrollView>
						{renderHeader()}
						{renderLogo()}
						{renderForm()}
						{renderButton()}
					</ScrollView>
				</LinearGradient>
				{renderAreaCodesModal()}
			</KeyboardAvoidingView>
		)
	}

	export default SignUp;