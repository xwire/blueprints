use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Blueprint {
  pub id: String,
  pub title: String,
  pub inputs: Vec<DataType>,
  pub outputs: Vec<DataType>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum DataType {
  String,
  Number,
  Bool,
  Object,
}