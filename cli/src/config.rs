use anchor_client::Cluster;
use clap::{Parser};
use std::{str::FromStr};
use anyhow::Result;


#[derive(Default, Debug, Parser)]
pub struct ConfigOverride {
    /// Cluster override.
    #[clap(global = true, long = "provider.cluster")]
    pub cluster: Option<Cluster>,
    /// Wallet override.
    #[clap(global = true, long = "provider.wallet")]
    pub wallet: Option<WalletPath>,
}

// pub struct WithPath<T> {
//     inner: T,
//     path: PathBuf,
// }

// impl<T> WithPath<T> {
//     pub fn new(inner: T, path: PathBuf) -> Self {
//         Self { inner, path }
//     }

//     pub fn path(&self) -> &PathBuf {
//         &self.path
//     }

//     pub fn into_inner(self) -> T {
//         self.inner
//     }
// }

// impl<T> std::ops::Deref for WithPath<T> {
//     type Target = T;
//     fn deref(&self) -> &Self::Target {
//         &self.inner
//     }
// }

// impl<T> std::ops::DerefMut for WithPath<T> {
//     fn deref_mut(&mut self) -> &mut Self::Target {
//         &mut self.inner
//     }
// }

// impl<T> std::convert::AsRef<T> for WithPath<T> {
//     fn as_ref(&self) -> &T {
//         &self.inner
//     }
// }

#[derive(Debug, Default)]
pub struct Config {
    pub provider: ProviderConfig,
}

#[derive(Debug, Default)]
pub struct ProviderConfig {
    pub cluster: Cluster,
    pub wallet: WalletPath,
}

impl Config {
    pub fn override_config(cfg_override: &ConfigOverride) -> Result<Config> {
        let mut cfg = Config::default();
        
        if let Some(cluster) = cfg_override.cluster.clone() {
            cfg.provider.cluster = cluster;
        }
        if let Some(wallet) = cfg_override.wallet.clone() {
            cfg.provider.wallet = wallet;
        }

        return Ok(cfg);
    }
}

crate::home_path!(WalletPath, ".config/solana/id.json");